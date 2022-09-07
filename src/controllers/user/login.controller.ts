import { Request, Response } from "express";
import { validatePassword } from "../../services/login.service";
import config from "config";
import { successResponse } from "../../common/utils/response";
import { signJWT } from "../../common/utils/jwt.utils";
import log from "../../log";

export async function createLoginHandler(req: Request, res: Response) {
  try {
    const user = await validatePassword(req.body);

    const accessToken = signJWT(
      { ...user },
      { expiresIn: config.get("accessTokenTl") }
    );

    const refreshToken = signJWT(
      { ...user },
      { expiresIn: config.get("refreshTokenTl") }
    );

    const response = successResponse({
      message: "You are logged in successfully",
      data: user,
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

export async function logoutHandler(req: Request, res: Response) {
  try {
    const response = successResponse({
      message: "You are now Logged out",
    });
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
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
