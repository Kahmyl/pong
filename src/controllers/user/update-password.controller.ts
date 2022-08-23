import { Request, Response } from "express";
import {
  editPassword,
  userProfile,
  getFriend,
} from "../../services/profile.service";
import bcrypt from "bcrypt";
import config from "config";
import log from "../../log";
import { successResponse } from "../../common/utils/response";
import { UnAuthorizedErrorException } from "../../common/utils/error-response";

export async function updatePasswordHandler(req: Request, res: Response) {
  if (!res.locals.user) {
    throw UnAuthorizedErrorException("User not authorized");
  }
  const userId = res.locals.user._id;
  const { newPassword, oldPassword } = req.body;
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const password = await bcrypt.hashSync(newPassword, salt);
  const input = { password };

  try {
    const result = await editPassword(userId, input, oldPassword);
    const response = successResponse({
      message: "Password uploaded Successfuly",
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
