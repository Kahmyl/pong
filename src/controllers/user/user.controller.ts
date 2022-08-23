import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../../services/user.service";
import config from "config";
import log from "../../log";
import { signJWT } from "../../common/utils/jwt.utils";
import { successResponse } from "../../common/utils/response";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    const result = await omit(user.toJSON(), "password");

    const accessToken = signJWT(
      { ...result },
      { expiresIn: config.get("accessTokenTl") }
    );

    const refreshToken = signJWT(
      { ...result },
      { expiresIn: config.get("refreshTokenTl") }
    );

    const response = successResponse({
      message: "User Created Successfuly",
      data: result,
    });

    return res
      .cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 12,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
      })
      .send(response);
  } catch (error: any) {
    if (error.custom) {
      res.status(error.status);
      log.error(error.message);
    }
    log.error(error);
    res.send(error);
  }
}
