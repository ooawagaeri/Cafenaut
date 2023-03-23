import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ClassifierService } from './classifier.service';
import { Request } from 'express';

@Controller('/classify')
export class ClassifierController {
  constructor(
    private classifierService: ClassifierService,
  ) {
  }

  @Post('connoisseur')
  trainConnoisseur(@Body() body: { text: string | string[], label: string }): void {
    this.classifierService.trainConnoisseur(body.text, body.label);
  }

  @Post('drink')
  trainCoffeeTea(@Body() body: { text: string | string[], label: string }): void {
    this.classifierService.trainDrink(body.text, body.label);
  }

  @Get('connoisseur')
  retrieveConnoisseur(@Body() body: { text: string }): string | void {
    return this.classifierService.retrieveConnoisseur(body.text);
  }

  @Get('drink')
  retrieveCoffeeTea(@Body() body: { text: string }): string | void {
    return this.classifierService.retrieveDrink(body.text);
  }

  @Put('user')
  async classifyUser(@Req() request: Request): Promise<void> {
    const uid = request['user']?.uid;
    await this.classifierService.retrieveUserClassification(uid);
  }
}
