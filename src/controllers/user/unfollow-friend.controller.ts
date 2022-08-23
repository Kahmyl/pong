import { Request, Response } from "express";
import {
  ForbiddenErrorException,
  UnAuthorizedErrorException,
} from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import { getFriend } from "../../services/profile.service";

export async function unFollowUser(req: Request, res: Response) {
  try {
    if (!res.locals.user) {
      throw UnAuthorizedErrorException("User is not Authorized");
    }
    const followerId = res.locals.user._id;
    if (res.locals.user._id === req.params.id) {
      throw ForbiddenErrorException("You cannot follow yourself");
    }
    const user = await getFriend(req.params.id);
    const currentUser = await getFriend(res.locals.user._id);
    if (user && currentUser && user.followers.includes(followerId)) {
      await user.updateOne({ $pull: { followers: followerId } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      const response = successResponse({
        message: `${user.name} has been unfollowed`,
      });
      res.send(response);
    } else {
      throw ForbiddenErrorException("You don't follow this user");
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}
