import express from "express";
import {
  createPostHandler,
  deletePostHandler,
  LikeHandler,
  PostsHandler,
  SinglePostHandler,
  updatePostHandler,
} from "../controllers/post/post.controller";

const postRoute = express.Router();

postRoute.get("/", PostsHandler);

postRoute.get("/:postId", SinglePostHandler);

postRoute.post("/create", createPostHandler);

postRoute.put("/update/:postId", updatePostHandler);

postRoute.delete("/delete/:postId", deletePostHandler);

postRoute.put("/:postId/like", LikeHandler);

export default postRoute;
