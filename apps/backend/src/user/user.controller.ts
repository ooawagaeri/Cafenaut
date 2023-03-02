import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import * as firebase from 'firebase-admin';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  getData() {
    return this.userService.getData();
  }

  @Get('/hello')
  getHello(@Req() request: Request): { res: string } {
    return {
      res: 'Hello ' + request['user']?.email + '!'
    };
  }

  @Get('/user')
  async getUserDetails(@Req() request: Request): Promise<{ res: { name: string, email: string } }> {
    const snapshot = await firebase.firestore().collection("users")
      .where("uid", "==", request['user']?.uid)
      .limit(1)
      .get()
    const userDetails = snapshot.docs[0].data();
    return {
      res: {
        name: userDetails.name,
        email: userDetails.email,
      }
    };
  }
}
