import { Injectable } from '@nestjs/common';
import {Browser} from 'puppeteer';
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin());
const {executablePath} = require('puppeteer');


@Injectable()
export class SearchService {

    public async searchPage(url: string){
        
        console.log(url);
        try {
                    
            const htmlComponent = await this.getProductDescriptionFromUrl(url); 

        } catch (error) {

            // Manejo de errores

        }

    }

    async getProductDescriptionFromUrl(url: string) {
        try {

            const browser = await puppeteer.use(StealthPlugin()).launch({ headless: true }); //headles:false para ver el navegador
            const page = await browser.newPage();
            await page.goto(url);
    
            // Guardar una captura de pantalla para verificar si hay CAPTCHA
            await page.screenshot({ path: 'webpagescreen.png' });
    
            const result = await page.evaluate(() => {
                //Lo siguiente funciona si NO hay captcha
                const productDescription = document.querySelector('#productDescription > p > span').textContent;
                return productDescription;
            });
    
            console.log(result);
            await browser.close();

        } catch (error) {
            console.error('Error while fetching HTML component:', error);
        }
    }

}

/*
const data = [...quotes].map((quote) => {
    const quoteText = quote.querySelector(".text").innerText;
    const author = quote.querySelector(".author").innerText;
    const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.innerText
    );
    return {
        quoteText,
        author,
        tags,
    };
});
      */