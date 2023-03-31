import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
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

  @Get(':uid')
  getUser(@Param('uid') uid: string): Promise<User> {
    return this.userService.getUserDetails(uid);
  }

  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUserDetails();
  }

  @Post('/subset')
  async getSubsetUsers(@Body() body: { uids: string[] }): Promise<User[]> {
    return this.userService.getSubsetUserDetails(body.uids);
  }

  @Put('/follow')
  async addFollow(
    @Body() body: { own_uid: string; following_uid: string }
  ): Promise<void> {
    return this.userService.addFollow(body.own_uid, body.following_uid);
  }

  @Put('/unfollow')
  async unfollow(
    @Body() body: { own_uid: string; following_uid: string }
  ): Promise<void> {
    return this.userService.unfollow(body.own_uid, body.following_uid);
  }
}
