import { Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Get, Param, Put, Body } from '@nestjs/common';

export interface MessageEvent {
  data: string | object;
}

@Controller('post')
export class PostController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getPosts() {
    return await this.prisma.post.findMany({
      include: {
        likedBy: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  @Put('like')
  async handleLike(@Body() body) {
    const postId = parseInt(body.postId);
    const userId = parseInt(body.sender);
    const likeAmt = parseInt(body.likeAmt);

    try {
      // user update
      const likedPostObj = await this.prisma.likedPosts.findUnique({
        where: {
          userId_postId: { userId, postId },
        },
      });
      if (likedPostObj === null || likedPostObj === undefined) {
        // like
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            likedPosts: {
              create: [{ postId: postId }],
            },
          },
        });

        // post
        await this.prisma.post.update({
          where: { id: postId },
          data: { like: likeAmt + 1 },
        });
      } else {
        let likeAmtAfterReduce = likeAmt;
        if (likeAmt > 0) {
          likeAmtAfterReduce -= 1;
        }

        await this.prisma.post.update({
          where: { id: postId },
          data: { like: likeAmtAfterReduce },
        });

        await this.prisma.likedPosts.delete({
          where: {
            userId_postId: { userId, postId },
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
