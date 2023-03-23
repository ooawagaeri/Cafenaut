import { Body, Controller, Get } from '@nestjs/common';
import { Location } from './location.interface';
import { MiddleGroundService } from './middle-ground.service';
import { CafeModel } from '../cafe/cafe.interface';
import { CafeService } from '../cafe/cafe.service';

@Controller('/mid')
export class MiddleGroundController {
  constructor(
    private readonly midGrdService: MiddleGroundService,
    private readonly cafeService: CafeService,
  ) {
  }

  @Get()
  async findCafes(@Body() body: { locations:Location[] }): Promise<CafeModel[]> {
    const midPoint = this.midGrdService.calculateCenter(body.locations);
    const allCafes = await this.cafeService.getAllCafes();
    return await this.midGrdService.retrieveNearbyCafes(midPoint, allCafes);
  }
}
