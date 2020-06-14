import * as nodemailer from "nodemailer";
import { GREEN, RED } from "./colors";
import User, { IUser } from "../server/models/User";

/**
 * Create a random alphanumeric string of length 10.
 */
export function getRandomString() {
  return Math.random().toString(36).substring(2);
}

/**
 * Creates a new User that can be saved using mongoose.
 * @param username user's username.
 * @param password user's unhashed pass.
 * @param email user's email.
 */
export function createNewUser(username: string, password: string, email: string):IUser{
  return new User({
    username: username,
    password: password,
    email: email,
    avatarURL: `https://api.adorable.io/avatars/200/${getRandomString()}`,
    mmr: 1000,
    bio: "This user has no bio.",
    dateCreated: new Date(),
    deleted: false,
    isAdmin: false,
    activated: false,
  });
}

/**
 * Send a verification email for a newly registered user.
 * @param user The user to send the email to
 * @param callback Called when the mailer succeeds.
 */
export function sendVerificationEmail(user: IUser, callback: (success: boolean) => void): void {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "csc301hms@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Marcok Board Game" <csc301hms@gmail.com>',
    to: `${user.email}`,
    subject: "Marcok Board Game Verification Email",
    text: `Hello ${user.username},\n\nPlease follow the following steps:\n\n` + 
    `1. Log in using the user and password you made.\n\n` + 
    `2. Click the following link to complete account activation:\n\n` + 
    `${process.env.BASE_URL}/activate/${user.id}\n\n Marcok Board Game`,
  };

  transporter.sendMail(mailOptions, (err: Error, data: any) => {
    if (err) {
      console.log(RED, `[NODEMAILER] Error ${err.message}`);
      callback(false);
    } else {
      console.log(GREEN, "[NODEMAILER] Email Sent.");
      callback(true);
    }
  });
}
