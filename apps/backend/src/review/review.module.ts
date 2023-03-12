import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { AuthenticityService } from "../analysis/authenticity.service";

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewService, AuthenticityService],
})

export class ReviewModule {}
