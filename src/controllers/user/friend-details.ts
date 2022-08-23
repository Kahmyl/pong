import { Request, Response } from "express";
import { singleFriend } from "../../services/profile.service";
import { omit } from "lodash";
import {
  ServerErrorException,
  UnAuthorizedErrorException,
} from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import log from "../../log";

export async function getFriendProfile(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    if (!userId) {
      throw UnAuthorizedErrorException("User is not Authorized");
    }
    const user = await singleFriend(req.params.id);
    if (!user) {
      throw ServerErrorException("Something went wrong");
    }
    const result = await omit(user.toJSON(), "password");
    const response = successResponse({
      message: "User Profile Fetched successfully",
      data: result,
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
