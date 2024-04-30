import { Injectable } from "@nestjs/common";
import { WordsRepository } from "./descriptionWords.repository";
import { Word } from "./schemas/descriptionWords.schema";


@Injectable()
export class WordsService{
    constructor(private readonly wordsRepository: WordsRepository){}

    async addWord(content: string): Promise<Word>{
        return this.wordsRepository.addWord({
            wordcontent: content,
            amount: 1,
        });
    }

    async getWords(): Promise<Word[]> {
        return this.wordsRepository.findAllWords();
    }

    async incrementWordAmount(content: string): Promise<Word> {
        const existingWord = await this.wordsRepository.findOne({ wordcontent: content });
    
        if (existingWord) {
            existingWord.amount++;
            return this.wordsRepository.findOneAndUpdate({ wordcontent: content }, { amount: existingWord.amount });
        } else {
            return this.wordsRepository.addWord({ wordcontent: content, amount: 1 });
        }
    }
}
