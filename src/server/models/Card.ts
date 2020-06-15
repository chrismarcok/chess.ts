import { Schema, Document, model } from "mongoose";

export const CardSchema: Schema = new Schema({
  title: { type: String, required: true },
  picture: { type: String, required: true },
  type: { type: String, required: true, enum: ["WEAPON", "CLUE"] },
});

export interface ICard extends Document {
  _id: string;
  title: string;
  picture: string;
  type: "WEAPON" | "CLUE";
}

export interface ReactCard {
  _id: string;
  title: string;
  picture: string;
  type: "WEAPON" | "CLUE";
}

export default model<ICard>("cards", CardSchema);
