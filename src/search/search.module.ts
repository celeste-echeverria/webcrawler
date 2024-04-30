import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { FilterwordsModule } from 'src/filterwords/filterwords.module';
import { WordsModule } from 'src/descriptionwords/descriptionWords.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FetchedURL, FetchedURLsSchema } from './schemas/searchs.schema';
import { SearchsRepository } from './searchs.repository';

@Module({
    imports: [ 
        MongooseModule.forFeature([{name: FetchedURL.name, schema: FetchedURLsSchema}]),
        FilterwordsModule, 
        MongooseModule.forRoot('mongodb://localhost/webscraper'), 
        WordsModule,
    ],
    controllers: [SearchController],
    providers: [SearchService, SearchsRepository],
    exports: [SearchService],
})
export class SearchModule {}
