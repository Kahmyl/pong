import express from "express";
import validateRequest from "../common/middleware/validateRequest";
import { createPostHandler } from "../controllers/post/create-post.controller";
import { deletePostHandler } from "../controllers/post/delete-post.controller";
import { LikeHandler } from "../controllers/post/like-post.controller";
import {
  FriendPostsHandler,
  PostsHandler,
  UserPostsHandler,
} from "../controllers/post/post.controller";
import { SinglePostHandler } from "../controllers/post/single-post.controller";
import { updatePostHandler } from "../controllers/post/update-post.controller";
import { postSchema } from "../schema/post.schema";

const postRoute = express.Router();

postRoute.get("/", PostsHandler);

postRoute.get("/user", UserPostsHandler);

postRoute.get("/friend/:userId", FriendPostsHandler);

postRoute.get("/:postId", SinglePostHandler);

postRoute.post("/create", validateRequest(postSchema), createPostHandler);

postRoute.put(
  "/update/:postId",
  validateRequest(postSchema),
  updatePostHandler
);

postRoute.delete("/delete/:postId", deletePostHandler);

postRoute.put("/:postId/like", LikeHandler);

export default postRoute;
