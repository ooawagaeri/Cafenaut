import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PreAuthMiddleware } from "../auth/pre-auth-middleware.service";
import { ReviewController } from '../review/review.controller';
import { ReviewService } from '../review/review.service';

@Module({
  imports: [],
  controllers: [UserController, ReviewController],
  providers: [UserService, ReviewService],
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
