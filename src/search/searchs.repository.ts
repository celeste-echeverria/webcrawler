import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { FetchedURL, FetchedURLsDocument } from "./schemas/searchs.schema";

@Injectable()
export class SearchsRepository {
    constructor(@InjectModel(FetchedURL.name) private FetchedURLsModel: Model<FetchedURLsDocument>) { }

    async findOne(wordFilterQuery: FilterQuery<FetchedURL>): Promise<FetchedURL> {
        return this.FetchedURLsModel.findOne(wordFilterQuery);
    }

    async addURL(word: FetchedURL): Promise<FetchedURL> {
        const newURL = new this.FetchedURLsModel(word);
        return newURL.save();
    }

}