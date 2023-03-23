import { Module } from '@nestjs/common';
import { ClassifierController } from './classifier.controller';
import { ClassifierService } from "./classifier.service";

@Module({
  imports: [],
  controllers: [ClassifierController],
  providers: [ClassifierService],
})

export class ClassifierModule {
}
