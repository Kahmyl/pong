import express from "express"
import config from 'config'
import log from "./log"
import cors from 'cors'
import connect from './utils/connect';
import routes from "./routes";

const app = express()

const port = config.get<number>('port');
const host = config.get<string>('host');

app.listen(port, host, async () => {
    log.info(`app is listening at http://${host}:${port}`)
    await connect();

    routes(app)
})