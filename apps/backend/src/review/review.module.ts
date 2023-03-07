import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { DatabaseService } from "../firebase/database.service";
import { SentimentAnalyser } from "../analysis/sentiment";
import { SpamAnalyser } from "../analysis/spam";
import { ChatGptAnalyser } from "../analysis/chatgpt";

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewService, DatabaseService, SentimentAnalyser, SpamAnalyser, ChatGptAnalyser],
})

export class ReviewModule {}
