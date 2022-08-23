import { Request, Response } from "express";
import {
  BadRequestErrorException,
  UnAuthorizedErrorException,
} from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import log from "../../log";
import { singlePost } from "../../services/post.service";

export async function LikeHandler(req: Request, res: Response) {
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
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      const response = successResponse({
        message: "The post has been liked",
      });
      res.send(response);
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      const response = successResponse({
        message: "The post has been unliked",
      });
      res.send(response);
    }
  } catch (error: any) {
    if (error.custom) {
      res.status(error.status);
      log.error(error.message);
    }
    log.error(error);
    res.send(error);
  }
}
