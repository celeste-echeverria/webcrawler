import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './search.dto';
import { FilterWordsService } from 'src/filterwords/filterwords.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService, 
        private readonly filterWordsService: FilterWordsService,
    ){};
    
    
    /*@Post('')
    async scrapeWebPage(@Body() data: SearchDto){

        console.log('LA URL RECIBIDA EN POST ES:', data.url)
        const description = await this.searchService.getProductDescriptionFromUrl(data.url);
        
        const filtereddata = await this.filterWordsService.getWordsFromDescription(description);
        console.log(filtereddata);

        return filtereddata;

    }*/

    @Get('')
    async generateWordCloud(@Body() data: SearchDto){
        
    }
}
