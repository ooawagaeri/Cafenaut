import { Controller, Get, Req } from '@nestjs/common';
import { Location } from './location.interface';
import { MiddleGroundService } from './middle-ground.service';
import { CafeModel } from '../cafe/cafe.interface';
import { CafeService } from '../cafe/cafe.service';
import { Request } from 'express';
import { ReviewService } from "../review/review.service";

@Controller('/mid')
export class MiddleGroundController {
  constructor(
    private readonly midGrdService: MiddleGroundService,
    private readonly cafeService: CafeService,
    private readonly reviewService: ReviewService,
  ) {
  }

  @Get()
  async findCafes(@Req() request: Request): Promise<{ cafes: CafeModel[]; midpoint: Location }> {
    const queryLocations = JSON.stringify(request.query['locations'] as string);
    const locations = JSON.parse(queryLocations) as Location[];

    const midPoint = this.midGrdService.calculateCenter(locations);
    const allCafes = await this.cafeService.getAllCafes();
    const nearby = await this.midGrdService.retrieveNearbyCafes(midPoint, allCafes);
    const cafePins = await this.reviewService.getCafePins(nearby);

    return {
      cafes: cafePins,
      midpoint: midPoint,
    };
  }
}
