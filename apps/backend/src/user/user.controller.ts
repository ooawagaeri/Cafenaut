import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from "./user.interface";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  getData() {
    return this.userService.getData();
  }

  @Get('/user')
  async getUserDetails(@Req() request: Request): Promise<User> {
    return this.userService.getUserDetails(request['user']?.uid);
  }
}
