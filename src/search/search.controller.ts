import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { WordsService } from 'src/descriptionwords/descriptionWords.service';

@Controller('search')
export class SearchController{
    constructor(
        private readonly searchService: SearchService, 
        private readonly wordsService: WordsService,
    ){};
        
    @Post('')
    async scrapeWebPage(@Body() data: SearchDto){

        this.searchService.getData(data.url);

    }

    @Get('cloud')
    async generateWordCloud(){
        
        const words = await this.wordsService.getWords()
        console.log(words);
        return words;
        
    }
    
}
