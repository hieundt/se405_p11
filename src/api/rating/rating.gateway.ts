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
import { RatingService } from './rating.service';

@WebSocketGateway(appConfig().webSocketPort, { cors: { origin: '*' } })
export class RatingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private ratingService: RatingService) {}

  @WebSocketServer() server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('user-connected', `User with ID: ${client.id} connected`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('user-disconnected', `User with ID: ${client.id} disconnected`);
  }

  @SubscribeMessage('create-rating')
  async handleCreateRating(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      const rating = await this.ratingService.create({
        userId: payload.userId,
        recipeId: payload.recipeId,
        rating: payload.rating,
      });
      client.broadcast.emit('rating', rating);
      client.emit('create-rating-success', rating);
    } catch (error) {
      client.emit('create-rating-error', { message: error.message });
    }
  }

  @SubscribeMessage('update-rating')
  async handleUpdateRating(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      const rating = await this.ratingService.update(payload.id, {
        userId: payload.userId,
        recipeId: payload.recipeId,
        rating: payload.rating,
      });
      client.broadcast.emit('rating', rating);
      client.emit('update-rating-success', rating);
    } catch (error) {
      client.emit('update-rating-error', { message: error.message });
    }
  }

  @SubscribeMessage('delete-rating')
  async handleDeleteRating(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    try {
      const rating = await this.ratingService.delete(payload.id);
      client.broadcast.emit('rating', rating);
      client.emit('delete-rating-success', { id: payload.id });
    } catch (error) {
      client.emit('delete-rating-error', { message: error.message });
    }
  }
}
