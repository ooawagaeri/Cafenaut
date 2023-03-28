import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CafeModel, CafePinModel } from './cafe.interface';
import { CafeService } from './cafe.service';
import { ReviewService } from "../review/review.service";

@Controller('cafe')
export class CafeController {
  constructor(
    private readonly cafeService: CafeService,
    private readonly reviewService: ReviewService
  ) {}

  @Get()
  getAllCafes(): Promise<CafeModel[]>  {
    return this.cafeService.getAllCafes();
  }

  @Get('pins')
  async getCafePins(): Promise<CafePinModel[]> {
    const cafes = await this.cafeService.getAllCafes();

    const cafePins = []
    for (const cafe of cafes) {
      const reviews = await this.reviewService.getByCafe(cafe.id);
      // Average authenticity
      const authScores = reviews.map((r) => r.authenticity);
      const authTotal = authScores.reduce((a,b) => a + b, 0);
      const cafePin = {
        ...cafe,
        popularity: reviews.length,
        authenticity: authTotal / authScores.length,
      };
      cafePins.push(cafePin);
    }
    return cafePins;
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
