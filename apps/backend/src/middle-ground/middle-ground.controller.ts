import { Body, Controller, Get } from "@nestjs/common";
import { Location } from "./location.interface";
import { MiddleGroundService } from "./middle-ground.service";

const RADIUS = 5000; // 5km

@Controller("/mid")
export class MiddleGroundController {
  constructor(private readonly midGrdService: MiddleGroundService) {
  }

  @Get()
  findMiddleGround(@Body() body: { A: Location, B: Location }): Location {
    return this.midGrdService.calculateCenter(body.A, body.B);
  }
}
