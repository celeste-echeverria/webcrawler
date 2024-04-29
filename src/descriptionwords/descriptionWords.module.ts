import { MongooseModule } from "@nestjs/mongoose";
import { WordsSchema } from "./schemas/descriptionWords.schema";
import { Module } from "@nestjs/common";

@Module({
    imports: [MongooseModule.forFeature([{name: Word.name, schema: WordsSchema}])]
})

export class Word{ }