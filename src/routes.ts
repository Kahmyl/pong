import { Express, Request, Response, Router } from "express";
import { createUserHandler, getAuthUser } from "./controllers/user.controller";
import { createLoginHandler } from "./controllers/login.controller";
import {
  createPostHandler,
  PostsHandler,
  SinglePostHandler,
  updatePostHandler,
  deletePostHandler,
  LikeHandler,
} from "./controllers/post.controller";
import validateRequest from "./common/middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";
import { createLoginSchema } from "./schema/login.schema";
import {
  updatePasswordHandler,
  getUserProfile,
  getUserFriend,
  followUser,
  unFollowUser,
} from "./controllers/profile.controller";

export default function (router: Router) {
  router.get("/health", (req: Request, res: Response) => {
    res.status(200).send("hello");
  });

  router.get("/user", getAuthUser);

  router.post(
    "/register",
    validateRequest(createUserSchema),
    createUserHandler
  );

  router.post("/login", validateRequest(createLoginSchema), createLoginHandler);

  router.get("/posts", PostsHandler);

  router.get("/post/:postId", SinglePostHandler);

  router.post("/post/create", createPostHandler);

  router.put("/post/update/:postId", updatePostHandler);

  router.delete("/post/delete/:postId", deletePostHandler);

  router.put("/post/:postId/like", LikeHandler);

  router.put("/user/pass/:userId", updatePasswordHandler);

  router.get("/user/profile", getUserProfile);

  router.get("/friend/:userId", getUserFriend);

  router.put("/:id/follow", followUser);

  router.put("/:id/unfollow", unFollowUser);
}
