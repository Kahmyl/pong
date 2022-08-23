import { Request, Response } from "express";
import { userProfile } from "../../services/profile.service";
import { omit } from "lodash";
import { UnAuthorizedErrorException } from "../../common/utils/error-response";
import { successResponse } from "../../common/utils/response";
import log from "../../log";

export async function getUserProfile(req: Request, res: Response) {
  try {
    if (!res.locals.user) {
      throw UnAuthorizedErrorException("User is not Authorized");
    }
    const userId = res.locals.user._id;
    const user = await userProfile({ input: userId });
    const result = await omit(user.toJSON(), "password");
    const response = successResponse({
      message: "User Profile Fetched successfully",
      data: result,
    });
    res.send(response);
  } catch (error: any) {
    if (error.custom) {
      res.status(error.status);
    }
    log.error(error.message);
    res.send(error);
  }
}
