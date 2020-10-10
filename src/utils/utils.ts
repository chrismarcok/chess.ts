import { GREEN, RED } from "./colors";

/**
 * Create a random alphanumeric string of length 10.
 */
export function getRandomString() {
  return Math.random().toString(36).substring(2);
}

/**
 * Check to see if the id passed in is a valid mongo _id. (24 chars, hex)
 * @param id the id passed in.
 */
export function checkHexSanity(id:string){
  const re = /[0-9a-f]{24}/g;
  return re.test(id);
}