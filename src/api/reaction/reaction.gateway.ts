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
import { ReactionService } from './reaction.service';

@WebSocketGateway(appConfig().webSocketPort, { cors: { origin: '*' } })
export class ReactionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private reactionService: ReactionService) {}

  @WebSocketServer() server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('user-connected', `User with ID: ${client.id} connected`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('user-disconnected', `User with ID: ${client.id} disconnected`);
  }

  @SubscribeMessage('create-reaction')
  async handleCreateReaction(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      const reaction = await this.reactionService.create({
        userId: payload.userId,
        recipePostId: payload.recipePostId,
        react: payload.react,
      });
      client.broadcast.emit('reaction', reaction);
      client.emit('create-reaction-success', reaction);
    } catch (error) {
      client.emit('create-reaction-error', { message: error.message });
    }
  }

  @SubscribeMessage('get-reaction')
  async handleUpdateReaction(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      const reactionData = await this.reactionService.findRecipePostReaction(payload.recipePostId);
      client.broadcast.emit('reaction', reactionData);
      client.emit('get-reaction-success', reactionData);
    } catch (error) {
      client.emit('get-reaction-error', { message: error.message });
    }
  }

  @SubscribeMessage('delete-reaction')
  async handleDeleteReaction(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      const reaction = await this.reactionService.delete(payload.id);
      client.broadcast.emit('reaction', reaction);
      client.emit('delete-reaction-success', { id: payload.id });
    } catch (error) {
      client.emit('delete-reaction-error', { message: error.message });
    }
  }
}
