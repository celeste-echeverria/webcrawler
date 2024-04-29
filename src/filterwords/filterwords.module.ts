import { Module } from '@nestjs/common';
import { FilterWordsController } from './filterwords.controller';
import { FilterWordsService } from './filterwords.service';

@Module({
  controllers: [FilterWordsController],
  providers: [FilterWordsService],
  exports: [FilterWordsService],
})
export class FilterwordsModule {}
