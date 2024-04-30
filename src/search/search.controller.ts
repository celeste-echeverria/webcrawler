import { Controller, Get, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { WordsService } from 'src/descriptionwords/descriptionWords.service';

@Controller()
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
        private readonly wordsService: WordsService,
    ) { };

    @Post('')
    async scrapeWebPage(@Query("PARAM") data: string) {
        this.searchService.getData(data);
    }

    @Get('cloud')
    async generateWordCloud() {
        const words = await this.wordsService.getWords()
        return words;
    }

}
