import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterWordsService {

    async getWordsFromDescription(description: string) {
        //Slpit words into array elements
        const words = description.toLowerCase().match(/\b\w+\b/g) || [];
        
        const commonWords = [
            'a', 'an', 'the', 'and', 'but', 'or', 'so', 'as', 'from',
            'for', 'to', 'in', 'with', 'at', 'by', 'on', 'off', 'of',
            'about', 'above', 'below', 'under', 'over', 'across',
            'through', 'into', 'onto', 'toward', 'from', 'during',
            'before', 'after', 'against', 'among', 'between',
            'behind', 'beside', 'within', 'without', 'beyond',
            'amongst', 'along', 'around', 'via', 'per', 'upon',
            'like', 'near', 'since', 'until', 'upon', 'am', 'is',
            'are', 'was', 'were', 'be', 'being', 'been', 'have', 'all',
            'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'any', 'this',
            'will', 'would', 'shall', 'should', 'can', 'could', 'that', 'back',
            'may', 'might', 'must', 'ought', 'need', 'dare', 'it', 'its', 'your', 'our'
        ];

        //Filters out common words and numbers
        const filteredWords = words.filter(word => 
            !commonWords.includes(word) && 
            !/\d/.test(word) &&
            word.length > 1
        );
        return filteredWords;
    }
}
