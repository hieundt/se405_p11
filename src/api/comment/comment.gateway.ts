import {
  ConnectedSocket,
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

@WebSocketGateway(appConfig().webSocketPort, { cors: { origin: '*' } })
export class CommentGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly commentService: CommentService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    client.broadcast.emit('user-connected', `User with ID: ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    client.broadcast.emit('user-disconnected', `User with ID: ${client.id} disconnected`);
  }

  @SubscribeMessage('create-comment')
  async handleCreateComment(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId, recipePostId, isParent, parentId, content } = payload;
      const comment = await this.commentService.create({
        userId,
        recipePostId,
        isParent: true,
        parentId: '',
        content,
      });
      client.broadcast.emit('comment', comment);
      client.emit('create-comment-success', comment);
    } catch (error) {
      client.emit('create-comment-error', { message: error.message });
    }
  }

  @SubscribeMessage('create-reply-comment')
  async handleReplyCreateComment(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId, recipePostId, isParent, parentId, content } = payload;
      const comment = await this.commentService.create({
        userId,
        recipePostId,
        isParent: false,
        parentId,
        content,
      });
      client.broadcast.emit('comment', comment);
      client.emit('create-comment-success', comment);
    } catch (error) {
      client.emit('create-comment-error', { message: error.message });
    }
  }

  @SubscribeMessage('update-comment')
  async handleUpdateComment(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      const comment = await this.commentService.update(payload.id, {
        userId: payload.userId,
        recipePostId: payload.recipePostId,
        isParent: payload.isParent,
        parentId: payload.parentId,
        content: payload.content,
      });
      client.broadcast.emit('comment', comment);
      client.emit('update-comment-success', comment);
    } catch (error) {
      client.emit('update-comment-error', { message: error.message });
    }
  }

  @SubscribeMessage('delete-comment')
  async handleDeleteComment(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      const comment = await this.commentService.delete(payload.id);
      client.broadcast.emit('comment', comment);
      client.emit('delete-comment-success', comment);
    } catch (error) {
      client.emit('delete-comment-error', { message: error.message });
    }
  }
}
