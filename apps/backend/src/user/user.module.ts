import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PreAuthMiddleware } from "../auth/pre-auth-middleware.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
