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
    ) { };

    async getData(url: string) {

        const urlIsRepeated = await this.repeatedUrl(url);

        //Stores word count
        if (!urlIsRepeated) {

            const description = await this.getProductDescriptionFromHtml(url);

            if (description) {
                const filteredWords = await this.filterWordsService.getWordsFromDescription(description);

                for (const filteredWord of filteredWords) {
                    await this.wordsService.incrementWordAmount(filteredWord);
                }
            }

        } else {
            console.log("SearchService: getData - URL ", url, " is repeated. Cannot store word count.");
        }
    }

    async getProductDescriptionFromHtml(url: string): Promise<string> {
        try {
            const browser = await puppeteer.launch({
                headless: true
            });

            const [page] = await browser.pages();

            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'Referer': 'https://www.amazon.com',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;',
            }

            await page.setExtraHTTPHeaders(headers);
            await page.goto(url);

            let result = await page.evaluate(() => {
                const productDescription = document.querySelector('#productDescription > p > span').textContent;
                return productDescription;
            });

            await browser.close();
            return result;

        } catch (error) {
            console.log("SearchService: GetProductDescriptionFromHTML - Product Description not found in ", url);
        }
    }

    async repeatedUrl(content: string): Promise<boolean> {
        const existentURL = await this.searchsRepository.findOne({ url: content });
        if (!existentURL) {
            this.searchsRepository.addURL({ url: content });
            return false;
        } else {
            return true;
        }
    }

}
