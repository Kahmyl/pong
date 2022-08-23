import { Request, Response } from "express";
import { UnAuthorizedErrorException } from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import log from "../../log";
import { createPost } from "../../services/post.service";
import { PostType } from "../types";

export async function createPostHandler(req: Request, res: Response) {
  try {
    const { img, desc }: PostType = req.body;
    const userId = res.locals.user._id;
    if (!userId) {
      throw UnAuthorizedErrorException("User is not Authorized");
    }
    const post = await createPost({
      userId: res.locals.user._id,
      img: img,
      desc: desc,
    });

    const response = successResponse({
      message: "Post Created successfully",
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
