import { Body, Controller, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService){};
    
    @Post('')
    async searchPage(@Body() data: SearchDto){
        return await this.searchService.searchPage(data.url);
    }
}
