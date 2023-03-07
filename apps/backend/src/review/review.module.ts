import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { DatabaseService } from "../firebase/database.service";
import { SentimentAnalyser } from "../analysis/sentiment";
import { SpamAnalyser } from "../analysis/spam";

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewService, DatabaseService, SentimentAnalyser, SpamAnalyser],
})

export class ReviewModule {}
