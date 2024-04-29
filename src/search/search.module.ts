import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { FilterwordsModule } from 'src/filterwords/filterwords.module';

@Module({
    imports: [SearchModule, FilterwordsModule],
    controllers: [SearchController],
    providers: [SearchService],
    exports: [SearchService],
})
export class SearchModule {}
