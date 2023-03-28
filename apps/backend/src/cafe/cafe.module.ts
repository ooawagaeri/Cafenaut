import { Module } from '@nestjs/common';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { ReviewService } from "../review/review.service";

@Module({
    imports: [],
    controllers: [CafeController],
    providers: [CafeService, ReviewService],
})

export class CafeModule {}
