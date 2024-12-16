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
import { RatingDto } from './dto/rating.dto';
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
  async handleCreateRating(@ConnectedSocket() client: Socket, @MessageBody() payload: RatingDto) {
    const rating = await this.ratingService.create({
      userId: payload.userId,
      recipePostId: payload.recipePostId,
      rate: payload.rate,
    });

    client.broadcast.emit('rating', rating);
  }
}
