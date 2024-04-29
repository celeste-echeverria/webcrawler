import { Injectable } from '@nestjs/common';
const puppeteer = require('puppeteer-extra');
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

@Injectable()
export class SearchService {

    async getProductDescriptionFromUrl(url: string){
        try {

            const browser = await puppeteer.launch({
                headless: false, 
                slowMo: 400,
            }); //headles:false para ver el navegador
            
            const [page] = await browser.pages();
            
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'Referer': 'https://www.amazon.com',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9'
            }

            await page.setExtraHTTPHeaders(headers);
            
            //await page.goto(url);
            await page.goto(url)
            // Guardar una captura de pantalla para verificar si hay CAPTCHA
            await page.screenshot({ path: 'webpagescreen.png' });
            
            const result = await page.evaluate(() => {
                //Lo siguiente funciona en amazon si NO hay captcha
                const productDescription = document.querySelector('#productDescription > p > span').textContent;
                return productDescription;
            });
    
            console.log(result);

            await page.screenshot({ path: 'webpagescreen2.png' });
            await browser.close();

        } catch (error) {
            console.error('Error while fetching HTML component:', error);
        }
    }



}
