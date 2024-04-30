import { Injectable } from '@nestjs/common';
import { WordsService } from 'src/descriptionwords/descriptionWords.service';
import { FilterWordsService } from 'src/filterwords/filterwords.service';
import { SearchsRepository } from './searchs.repository';
const puppeteer = require('puppeteer-extra');

@Injectable()
export class SearchService {

    constructor(
        private readonly filterWordsService: FilterWordsService,
        private readonly wordsService: WordsService,
        private readonly searchsRepository: SearchsRepository,
    ){};

    async getData(url: string){

        console.log('LA URL RECIBIDA EN POST ES:', url)
        const urlIsRepeated = await this.repeatedUrl(url);
        if (!urlIsRepeated){ 
            console.log("entra");
            //Gets product description from url
            const description = await this.getProductDescriptionFromHtml(url);
            
            //Filters common words and numbers
            const filteredWords = await this.filterWordsService.getWordsFromDescription(description);
            console.log('ARRAY FILTRADO', filteredWords);
            
            //Add words to DB
            for (const filteredWord of filteredWords) {
                await this.wordsService.incrementWordAmount(filteredWord);
            }
        }
        

    }

    async getProductDescriptionFromHtml(url: string): Promise<string>{
        try {

            const browser = await puppeteer.launch({
                headless: false, 
            }); 
            
            const [page] = await browser.pages();
            
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'Referer': 'https://www.amazon.com',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;',
                //'DNT': '1',
                //'Cache-Control': 'no-cache',
            }

            await page.setExtraHTTPHeaders(headers);
            
            //await page.goto(url);
            await page.goto(url)
            // Guardar una captura de pantalla para verificar si hay CAPTCHA
            await page.screenshot({ path: 'webpagescreen.png' });
            
            let result = await page.evaluate(() => {
                //Lo siguiente funciona en amazon si NO hay captcha
                const productDescription = document.querySelector('#productDescription > p > span').textContent;
                console.log(productDescription);
                return productDescription;
            });

            await browser.close();
            console.log(result);
            if(result === null || result === undefined){
                //Tiene captcha o el producto no tiene descripcion
                return (' ');
            }else{
                return result;
            }

        } catch (error) {
            console.error('Error while fetching HTML component:', error);
        }
    }

    async repeatedUrl(content: string): Promise<boolean>{
        const existentURL = await this.searchsRepository.findOne({ url: content });
        if (!existentURL) {
            this.searchsRepository.addURL({url: content});
            return false;
        }else{
            return true;
        }
    }

}
