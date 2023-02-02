import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import User from './entities/user.entity';

@Injectable()
export class NotificationsService {
  notifications: Notification[] = [
    { sender: 1, receiver: 2, message: 'hello world' },
  ];

  onlineUsers: User[] = [{ id: 'dummy', socketId: 'asdasdasdas' }];

  send(senderId: number, receiverId: number) {
    const receiver = this.onlineUsers.filter((user) => {
      return parseInt(user.id) === receiverId;
    })[0];
    const notiObject = {
      receiverSocketId: receiver.socketId,
      message: senderId.toString() + ' say hello',
    };

    return notiObject;
  }

  assign(userId: string, socketId: string) {
    console.log(this.onlineUsers);

    if (this.onlineUsers.length === 0) {
      this.onlineUsers.push({ id: userId, socketId: socketId });
    } else {
      const target = this.onlineUsers.filter((user) => {
        return user.id === userId;
      });
      if (target.length > 0) {
        const user = target.map((i) => {
          return { ...i, [socketId]: socketId };
        });
        this.onlineUsers.push(user[0]);
        console.log(user[0]);
      } else {
        const newUser: User = {
          id: userId,
          socketId: socketId,
        };
        console.log(newUser);
        this.onlineUsers.push(newUser);
      }
    }
  }

  create(createNotificationDto: CreateNotificationDto) {
    // TODO: query code to create real data goes here
    const message = { ...createNotificationDto };
    this.notifications.push(message);

    return message;
  }

  findAll() {
    // TODO: real query code goes here...
    return this.notifications;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
