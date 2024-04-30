import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';
import { FilterWordsService } from './filterwords/filterwords.service';
import { FilterwordsModule } from './filterwords/filterwords.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WordsModule } from './descriptionwords/descriptionWords.module';

@Module({
  imports: [SearchModule, FilterwordsModule, MongooseModule.forRoot('mongodb://localhost/webscraper'), WordsModule],
  controllers: [AppController, SearchController],
  providers: [AppService, FilterWordsService],
})
export class AppModule { }
