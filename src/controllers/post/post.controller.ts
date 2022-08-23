import { Request, Response } from "express";
import {
  BadRequestErrorException,
  UnAuthorizedErrorException,
} from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import log from "../../log";
import { getPosts, getUserPosts } from "../../services/post.service";

export async function PostsHandler(req: Request, res: Response) {
  try {
    const posts = await getPosts();
    const response = successResponse({
      message: "Posts Fetched successfully",
      data: posts,
    });
    res.send(response);
  } catch (error: any) {
    if (error.custom) {
      res.status(error.status);
      log.error(error.message);
    }
    log.error(error);
    res.send(error);
  }
}

export async function UserPostsHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    if (!userId) {
      throw UnAuthorizedErrorException("User is not Authorized");
    }
    const posts = await getUserPosts(userId);
    const response = successResponse({
      message: "Posts Fetched successfully",
      data: posts,
    });
    res.send(response);
  } catch (error: any) {
    if (error.custom) {
      res.status(error.status);
      log.error(error.message);
    }
    log.error(error);
    res.send(error);
  }
}

export async function FriendPostsHandler(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw BadRequestErrorException("UserId param is required");
    }
    const posts = await getUserPosts(userId);
    const response = successResponse({
      message: "Posts Fetched successfully",
      data: posts,
    });
    res.send(response);
  } catch (error: any) {
    if (error.custom) {
      res.status(error.status);
      log.error(error.message);
    }
    log.error(error);
    res.send(error);
  }
}
