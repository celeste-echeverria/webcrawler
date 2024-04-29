import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterWordsService {

    getWordsFromDescription(description: string){

        //Separa las palabras
        const words = description.toLowerCase().match(/\b\w+\b/g) || [];

        // Filtrar las palabras comunes y los números
        const commonWords = [
            'a', 'an', 'the', 'and', 'but', 'or', 'so', 'as', 'from', 
            'for', 'to', 'in', 'with', 'at', 'by', 'on', 'off', 'of', 
            'about', 'above', 'below', 'under', 'over', 'across', 
            'through', 'into', 'onto', 'toward', 'from', 'during', 
            'before', 'after', 'against', 'among', 'between', 
            'behind', 'beside', 'within', 'without', 'beyond', 
            'amongst', 'along', 'around', 'via', 'per', 'upon', 
            'like', 'near', 'since', 'until', 'upon', 'am', 'is', 
            'are', 'was', 'were', 'be', 'being', 'been', 'have', 
            'has', 'had', 'having', 'do', 'does', 'did', 'doing', 
            'will', 'would', 'shall', 'should', 'can', 'could', 
            'may', 'might', 'must', 'ought', 'need', 'dare'
          ];
        const filteredWords = words.filter(word => !commonWords.includes(word) && !/\d/.test(word));
        return filteredWords;

    }


}
