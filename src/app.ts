import express from "express"
import config from 'config'
import log from "./log"
import cors from 'cors'
import connect from './utils/connect';
import routes from "./routes";
import deserializeUser from './middleware/deserializeUser';
import cookieParser from 'cookie-parser'

const app = express()

const port = config.get<number>('port');
const host = config.get<string>('host');

app.use(cors({
    credentials: true
}));

app.use(cookieParser())

app.use(express.json());

app.use(deserializeUser);

app.use(express.urlencoded({extended: false}))

app.listen(port, host, async () => {
    log.info(`app is listening at http://${host}:${port}`)
    await connect();

    routes(app)
})