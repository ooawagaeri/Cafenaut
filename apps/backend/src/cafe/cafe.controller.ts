import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CafeModel } from './cafe.interface';
import { CafeService } from './cafe.service';

@Controller('cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Get()
  getAllCafes(): Promise<CafeModel[]>  {
    return this.cafeService.getAllCafes();
  }

  @Get(':id')
  getCafe(@Param('id') id: string): Promise<CafeModel> {
    return this.cafeService.getCafe(id);
  }

  @Post()
  async postCafe(@Body() post: CafeModel): Promise<void> {
    await this.cafeService.create(post);
  }
}
