import { Schema, Document, model } from "mongoose";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, minlength: 1, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, minlength: 1, unique: true },
  avatarURL: { type: String, required: true },
  mmr: { type: Number, required: true },
  bio: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  activated: { type: Boolean, required: true }
});

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatarURL: string;
  mmr: number;
  bio: string;
  dateCreated: Date;
  deleted: boolean;
  admin: boolean;
  activated: boolean;
}

export interface ReactUser {
  _id: string;
  username: string;
  email: string;
  avatarURL: string;
  mmr: number;
  bio: string;
  dateCreated: Date;
  deleted: boolean;
  admin: boolean;
  activated: boolean;
}

export default model<IUser>('users', UserSchema);