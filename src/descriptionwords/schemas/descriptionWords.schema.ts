import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type WordsDocument = Word & Document;

@Schema()
export class Word{
    
    @Prop()
    wordcontent: string;

    @Prop()
    amount: number;
}

export const WordsSchema = SchemaFactory.createForClass(Word);