import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserDetails(@Req() request: Request): Promise<User> {
    return this.userService.getUserDetails(request['user']?.uid);
  }

  @Post('/follow')
  async addFollow(
    @Body() post: { own_uid: string; following_uid: string }
  ): Promise<void> {
    this.userService.addFollow(post.own_uid, post.following_uid);
  }
}
