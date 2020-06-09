import { Schema, Document, model } from "mongoose";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  avatarURL: { type: String, required: true },
  mmr: { type: Number, required: true },
  bio: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
});

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastName: string;
  avatarURL: string;
  mmr: number;
  bio: string;
  dateCreated: Date;
  deleted: boolean;
  admin: boolean;
}

export default model<IUser>('users', UserSchema);