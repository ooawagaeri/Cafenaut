import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }
  getHello(email: string): string {
    return 'Hello ' + email + '!';
  }
}
