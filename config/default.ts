import * as dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 8500,
  host: "localhost",
  dbURI: process.env.DB_URI,
  saltWorkFactor: 10,
  accessTokenTl: process.env.ACCESS_TOKEN_TL,
  refreshTokenTl: process.env.REFRESH_TOKEN_TL,
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
};
