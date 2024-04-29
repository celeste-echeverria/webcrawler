import { Injectable } from "@nestjs/common";
import { Word, WordsDocument } from "./schemas/descriptionWords.schema";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class DescriptionWordsRepository{
    constructor(@InjectModel(Word.name) private WordModel: Model<WordsDocument>){}

    async findOne(wordFilterQuery: FilterQuery<Word>): Promise<Word> {
        return this.WordModel.findOne(wordFilterQuery);
    }

    async addWord(word: Word): Promise<Word>{
        const newWord = new this.WordModel(word);
        return newWord.save();
    }

    

}