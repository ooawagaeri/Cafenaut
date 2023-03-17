import { Module } from "@nestjs/common";
import { MiddleGroundController } from "./middle-ground.controller";
import { MiddleGroundService } from "./middle-ground.service";

@Module({
  imports: [],
  controllers: [MiddleGroundController],
  providers: [MiddleGroundService],
})

export class MiddleGroundModule {
}
