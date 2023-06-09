import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.interface';
import { Request } from 'express';
import { AuthenticityService } from "../analysis/authenticity.service";
import { ClassifierService } from "../classifier/classifier.service";

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly authenticityService: AuthenticityService,
    private readonly classifierService: ClassifierService,
  ) {
  }

  @Get()
  getAllReviews() {
    return this.reviewService.getAll();
  }

  @Get('search')
  async searchReview(@Req() request: Request): Promise<{ reviews: ReviewModel[] }> {
    if (request.query['value'] === undefined || request.query['reviewToSearch'] === undefined) {
      return undefined;
    }
    const queryReviewToSearch = JSON.stringify(request.query['reviewToSearch'] as string);
    const reviewToSearch = JSON.parse(queryReviewToSearch) as ReviewModel;
    const value = request.query['value'] as string;
    const reviews = await this.reviewService.search(value, reviewToSearch);
    return {
      reviews,
    };
  }

  @Get(':id')
  async getReview(@Param('id') id: string): Promise<ReviewModel> {
    return this.reviewService.get(id);
  }

  @Post()
  async postReview(@Body() post: ReviewModel): Promise<void> {
    const reviewId = await this.reviewService.create(post);
    // Sync update scores
    await this.authenticityService.calculateAllAspects(reviewId)
      .then(() => console.log('Updating scores...'));
    // Async update class
    this.classifierService.retrieveUserClassification(post.user_uid)
      .then(() => console.log('Updating user class...'));
    // Async update search terms
    this.reviewService.updateKeyTerms(reviewId)
      .then(() => console.log('Updating search terms...'));
  }

  @Post('report/:id')
  async reportReview(@Param('id') id: string): Promise<void> {
    await this.reviewService.reportReview(id)
      .then(() => console.log('Updating report...'));
    this.authenticityService.calculateOnlyAuthenticity(id)
      .then(() => console.log('Updating authenticity...'));

  }
}
