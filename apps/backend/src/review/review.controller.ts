import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.interface';
import { SentimentAnalyser } from "../analysis/sentiment";
import { SpamAnalyser } from "../analysis/spam";

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly sentimentAnalyser: SentimentAnalyser,
    private readonly spamAnalyser: SpamAnalyser,
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
    post.sentiment = this.sentimentAnalyser.analysePost(post);
    post.spam = this.spamAnalyser.analysePost(post);
    return this.reviewService.create(post);
  }
}
