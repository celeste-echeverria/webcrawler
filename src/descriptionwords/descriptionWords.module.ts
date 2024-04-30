import { MongooseModule } from "@nestjs/mongoose";
import { WordsSchema, Word } from "./schemas/descriptionWords.schema";
import { Module } from "@nestjs/common";
import { WordsController } from "./descriptionWords.controller";
import { WordsService } from "./descriptionWords.service";
import { WordsRepository } from "./descriptionWords.repository";

@Module({
    imports: [MongooseModule.forFeature([{name: Word.name, schema: WordsSchema}])],
    controllers: [WordsController],
    providers: [WordsService, WordsRepository],
    exports: [WordsService]
})

export class WordsModule{ }