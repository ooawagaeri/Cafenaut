import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.interface';
import { SentimentAnalyser } from "../analysis/sentiment";
import { SpamAnalyser } from "../analysis/spam";
import { ChatGptAnalyser } from "../analysis/chatgpt";

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly sentimentAnalyser: SentimentAnalyser,
    private readonly spamAnalyser: SpamAnalyser,
    private readonly chatGptAnalyser: ChatGptAnalyser,
  ) {
  }

  @Get()
  getAllReviews() {
    return this.reviewService.getAll();
  }

  @Get(':id')
  async getReview(@Param('id') id: string): Promise<ReviewModel> {
    return this.reviewService.get(id);
  }

  @Post()
  async postReview(@Body() post: ReviewModel): Promise<void> {
    post.sentiment = await this.sentimentAnalyser.analysePost(post);
    post.spam = await this.spamAnalyser.analysePost(post);
    post.chat_gpt = await this.chatGptAnalyser.analysePost(post);
    return this.reviewService.create(post);
  }
}
