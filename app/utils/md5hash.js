const CryptoJS = require('crypto-js');

const ts = 1;
const publicKey = process.env.NEXT_PUBLIC_MAREL_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;

const concatenatedString = ts + privateKey + publicKey;

export const marvelApiKey = publicKey;
export const marvelHash = CryptoJS.MD5(concatenatedString).toString();