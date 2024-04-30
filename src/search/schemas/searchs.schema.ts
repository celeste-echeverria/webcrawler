import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FetchedURLsDocument = FetchedURL & Document;

@Schema()
export class FetchedURL {
    @Prop()
    url: string;
}

export const FetchedURLsSchema = SchemaFactory.createForClass(FetchedURL);