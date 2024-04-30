import { Injectable } from "@nestjs/common";
import { Word, WordsDocument } from "./schemas/descriptionWords.schema";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";

@Injectable()
export class WordsRepository{
    constructor(@InjectModel(Word.name) private WordModel: Model<WordsDocument>){}

    async findOne(wordFilterQuery: FilterQuery<Word>): Promise<Word> {
        return this.WordModel.findOne(wordFilterQuery);
    }

    async addWord(word: Word): Promise<Word>{
        const newWord = new this.WordModel(word);
        return newWord.save();
    }
    
    async findAllWords(): Promise<Word[]> {
        return this.WordModel.find().exec();
    }

    async findOneAndUpdate(wordFilterQuery: FilterQuery<Word>, update: UpdateQuery<Word>): Promise<Word> {
        return this.WordModel.findOneAndUpdate(wordFilterQuery, update, { new: true });
    }

}