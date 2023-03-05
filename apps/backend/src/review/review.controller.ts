import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.interface';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getAllReviews() {
    return this.reviewService.getAll();
  }

  // id is User's UUID + Post title
  @Get(':id')
  getReview(@Param('id') id: string): Promise<ReviewModel> {
    return this.reviewService.get(id);
  }

  @Post()
  postReview(@Body() post: ReviewModel): Promise<void> {
    return this.reviewService.create(post);
  }
}
