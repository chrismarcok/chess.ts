import { Schema, Document, model } from "mongoose";
import { UserSchema, ReactUser } from "./User";
import { DeckSchema, IDeck } from "./Deck";


const RoomSchema: Schema = new Schema({
  host: { type: UserSchema, required: true },
  players: { type: [UserSchema], required: true },
  decklist: { type: [DeckSchema], required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: '60m' }},
});

export interface IRoom extends Document{
  _id: string;
  host: ReactUser;
  players: [ReactUser];
  decklist: [IDeck];
}

export default model<IRoom>('rooms', RoomSchema);