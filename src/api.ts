import { Request, Response, Router } from "express";
import userRoute from "./routes/user-route";
import postRoute from "./routes/post-route";

export default function (router: Router) {
  router.get("/health", (req: Request, res: Response) => {
    res.status(200).send("hello");
  });

  router.use("/user", userRoute);
  router.use("/post", postRoute);
}
