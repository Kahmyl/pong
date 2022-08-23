import { Request, Response } from "express";
import {
  BadRequestErrorException,
  ForbiddenErrorException,
  UnAuthorizedErrorException,
} from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import log from "../../log";
import { singlePost } from "../../services/post.service";

export async function updatePostHandler(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    if (!postId) {
      throw BadRequestErrorException("PostId param is required");
    }
    if (!res.locals.user) {
      throw UnAuthorizedErrorException("User is not Authorized");
    }
    const userId = res.locals.user._id;
    const post = await singlePost(postId);
    if (post && post.userId._id != userId) {
      throw ForbiddenErrorException("You can only edit your post");
    }
    await post.updateOne({ $set: req.body });

    const response = successResponse({
      message: "Your post has been updated",
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
