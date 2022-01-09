import dotenv from "dotenv"
dotenv.config()


export default{
    port: 8500,
    host: 'localhost',
    dbURI: process.env.DVENT_DB_URI,
}