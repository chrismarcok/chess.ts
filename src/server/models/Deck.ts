import { Schema, Document, model } from "mongoose";
import { CardSchema, ICard } from "./Card";

export const DeckSchema: Schema = new Schema({
  cards: { type: [CardSchema], required: true },
  title: { type: String, required: true },
});

export interface IDeck extends Document {
  _id: string;
  cards: [ICard];
  title: string;
}

export interface ReactDeck {
  _id: string;
  cards: [ICard];
  title: string;
}

export default model<IDeck>("decks", DeckSchema);
