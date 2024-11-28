import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { appConfig } from 'src/config';
import { CommentService } from './comment.service';
import { Comment } from './schema/comment.schema';

@WebSocketGateway(appConfig().webSocketPort, { cors: { origin: '*' } })
export class CommentGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly commentService: CommentService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    client.broadcast.emit(
      'user-connected',
      `User with ID: ${client.id} connected`,
    );
    // this.server.emit('user-connected', `User with ID: ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    client.broadcast.emit(
      'user-disconnected',
      `User with ID: ${client.id} disconnected`,
    );
    // this.server.emit('user-disconnected', `User with ID: ${client.id} disconnected`,);
  }

  @SubscribeMessage('createComment') // socket.on
  async handleCreateComment(client: Socket, payload: any) {
    const comment = payload; //await this.commentService.create(payload);
    // console.log(comment);

    // client.emit('commentReply', 'This is a comment reply to the client'); //socket.emit()
    client.broadcast.emit('comment', comment); //io.emit()
    // this.server.emit('comment', comment); //io.emit()
  }
}
