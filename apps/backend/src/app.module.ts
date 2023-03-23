import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ReviewModule } from "./review/review.module";
import { UserModule } from "./user/user.module";
import { PreAuthMiddleware } from "./auth/pre-auth-middleware.service";
import { CafeModule } from "./cafe/cafe.module";
import { MiddleGroundModule } from "./middle-ground/middle-ground.module";
import { ClassifierModule } from "./classifier/classifier.module";

@Module({
  imports: [UserModule, ReviewModule, CafeModule, MiddleGroundModule, ClassifierModule],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
