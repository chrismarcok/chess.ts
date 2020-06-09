/**
 * Create a random alphanumeric string of length 10. 
 */
export function getRandomString(){
  return Math.random().toString(36).substring(2);
}