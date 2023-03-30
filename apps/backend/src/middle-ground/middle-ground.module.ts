import { Module } from '@nestjs/common';
import { MiddleGroundController } from './middle-ground.controller';
import { MiddleGroundService } from './middle-ground.service';
import { CafeService } from '../cafe/cafe.service';
import { ReviewService } from "../review/review.service";

@Module({
  imports: [],
  controllers: [MiddleGroundController],
  providers: [MiddleGroundService, CafeService, ReviewService],
})

export class MiddleGroundModule {
}
