import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';
import { FilterWordsService } from './filterwords/filterwords.service';
import { FilterwordsModule } from './filterwords/filterwords.module';
@Module({
  imports: [SearchModule, FilterwordsModule],
  controllers: [AppController, SearchController],
  providers: [AppService, FilterWordsService],
})
export class AppModule {}
