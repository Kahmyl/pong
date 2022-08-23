import { Request, Response } from "express";
import { BadRequestErrorException } from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import log from "../../log";
import { singlePost } from "../../services/post.service";

export async function SinglePostHandler(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    if (!postId) {
      throw BadRequestErrorException("PostId param is required");
    }

    const post = await singlePost(postId);
    const response = successResponse({
      message: "Posts Fetched successfully",
      data: post,
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
