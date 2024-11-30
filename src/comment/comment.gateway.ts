import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { appConfig } from 'src/config';
import { CommentService } from './comment.service';
// import { Comment } from './schema/comment.schema';

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
  }

  handleDisconnect(client: Socket) {
    client.broadcast.emit(
      'user-disconnected',
      `User with ID: ${client.id} disconnected`,
    );
  }

  @SubscribeMessage('createComment')
  async handleCreateComment(client: Socket, payload: any) {
    const comment = payload;

    client.emit('comment', comment);
  }
}
