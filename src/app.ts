import express, { Router } from "express";
import config from "config";
import log from "./log";
import cors from "cors";
import connect from "./utils/connect";
import routes from "./routes";
import deserializeUser from "./common/middleware/deserializeUser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const port = config.get<number>("port");
const host = config.get<string>("host");

const router = express.Router();

app.use(
  cors({
    credentials: true,
  })
);


app.use(cookieParser());

app.use(express.json());

app.use(deserializeUser);

app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/", router);

app.listen(port, host, async () => {
  log.info(`app is listening at http://${host}:${port}`);
  await connect();

  routes(router);
});
