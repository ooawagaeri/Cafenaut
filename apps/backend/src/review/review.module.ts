import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { DatabaseService } from "../firebase/database.service";

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewService, DatabaseService],
})

export class ReviewModule {}
