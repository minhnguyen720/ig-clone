import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server, Socket } from 'socket.io';
import { PartialType } from '@nestjs/mapped-types';
import { Notification } from './entities/notification.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway {
  // reference to the socket.io server
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationsService: NotificationsService) {}

  @SubscribeMessage('assign')
  assign(@MessageBody() userId: string, @ConnectedSocket() socket: Socket) {
    this.notificationsService.assign(userId, socket.id);
  }

  @SubscribeMessage('createNotification')
  async create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
    const message = await this.notificationsService.create(
      createNotificationDto,
    );

    // socket.io part
    // emit(name of the event, payload)
    // emit inform every client that it connected
    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('send')
  send(@MessageBody() payload: Notification) {
    // console.log(payload);
    const notiObject = this.notificationsService.send(
      payload.sender,
      payload.receiver,
    );
    this.server
      .to(notiObject.receiverSocketId)
      .emit('newNotifications', notiObject.message);
  }

  @SubscribeMessage('findAllNotifications')
  findAll() {
    return this.notificationsService.findAll();
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: number) {
    return this.notificationsService.findOne(id);
  }

  @SubscribeMessage('removeNotification')
  remove(@MessageBody() id: number) {
    return this.notificationsService.remove(id);
  }
}
