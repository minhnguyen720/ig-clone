import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type User = {
  username: String;
  password: String;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }
}
