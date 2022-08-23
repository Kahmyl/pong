import { Request, response, Response } from "express";
import {
  ForbiddenErrorException,
  UnAuthorizedErrorException,
} from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import log from "../../log";
import { getFriend } from "../../services/profile.service";

export async function followUser(req: Request, res: Response) {
  try {
    if (!res.locals.user._id) {
      throw UnAuthorizedErrorException("User is not Authorized");
    }
    const followerId = res.locals.user._id;
    if (res.locals.user._id === req.params.id) {
      throw ForbiddenErrorException("You cannot follow yourself");
    }
    const user = await getFriend(req.params.id);
    const currentUser = await getFriend(res.locals.user._id);
    if (user && currentUser && !user.followers.includes(followerId)) {
      await user.updateOne({ $push: { followers: followerId } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      const response = successResponse({
        message: `${user.name} has been followed`,
      });
      res.send(response);
    } else {
      throw ForbiddenErrorException("You follow this user");
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
