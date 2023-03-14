import { Module } from '@nestjs/common';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';

@Module({
    imports: [],
    controllers: [CafeController],
    providers: [CafeService],
})

export class CafeModule {}
