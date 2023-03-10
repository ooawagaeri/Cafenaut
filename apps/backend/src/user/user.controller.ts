import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from "./user.interface";

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async getUserDetails(@Req() request: Request): Promise<User> {
    return this.userService.getUserDetails(request['user']?.uid);
  }
}
