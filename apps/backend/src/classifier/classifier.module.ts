import { Module } from '@nestjs/common';
import { ClassifierController } from './classifier.controller';
import { ClassifierService } from "./classifier.service";
import { UserService } from "../user/user.service";

@Module({
  imports: [],
  controllers: [ClassifierController],
  providers: [ClassifierService, UserService],
})

export class ClassifierModule {
}
