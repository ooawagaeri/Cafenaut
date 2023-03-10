import { Controller, Get, Param } from '@nestjs/common';
import { CafeModel } from './cafe.interface';
import { CafeService } from './cafe.service';

@Controller('cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Get()
  getAllCafes(): Promise<CafeModel[]>  {
    return this.cafeService.getAllCafes();
  }

  @Get(':rid')
  getCafe(@Param('rid') rid: string): Promise<CafeModel> {
    return this.cafeService.getCafe(rid);
  }
}
