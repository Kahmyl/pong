import express, { Router } from "express";
import config from "config";
import log from "./log";
import cors from "cors";
import connect from "./common/utils/connect";
import routes from "./api";
import deserializeUser from "./common/middleware/deserializeUser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

var http, options, proxy, url, target;

http = require("http");

url = require("url");

const port = process.env.PORT ? parseInt(process.env.PORT) : 8500;
const host = process.env.HOST ? process.env.HOST : "localhost";

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

proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);
target = url.parse("http://ip.quotaguard.com/");

options = {
  hostname: proxy.hostname,
  port: proxy.port,
  path: target.href,
  headers: {
    "Proxy-Authorization": "Basic " + new Buffer(proxy.auth).toString("base64"),
    Host: target.hostname,
  },
};

http.get(options, function (res: any) {
  res.pipe(process.stdout);
  // return console.log("status code", res.statusCode);
});

app.listen(port, async () => {
  log.info(`app is listening at http://${host}:${port}`);
  await connect();

  routes(router);
});
