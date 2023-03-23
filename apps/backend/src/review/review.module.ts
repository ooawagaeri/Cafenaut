import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { AuthenticityService } from '../analysis/authenticity.service';
import { ClassifierService } from '../classifier/classifier.service';

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewService, AuthenticityService, ClassifierService],
})

export class ReviewModule {}
