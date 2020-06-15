import { Schema, Document, model } from "mongoose";
import { CardSchema, ICard } from "./Card";

export const DeckSchema: Schema = new Schema({
  cards: { type: [CardSchema], required: true },
});

export interface IDeck extends Document {
  _id: string;
  cards: [ICard];
}

export interface ReactDeck {
  _id: string;
  cards: [ICard];
}

export default model<IDeck>("decks", DeckSchema);
