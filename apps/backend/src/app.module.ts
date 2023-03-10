import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ReviewModule } from "./review/review.module";
import { UserModule } from "./user/user.module";
import { PreAuthMiddleware } from "./auth/pre-auth-middleware.service";

@Module({
  imports: [UserModule, ReviewModule],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
