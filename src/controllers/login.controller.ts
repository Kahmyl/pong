import { Request, Response } from "express";
import { validatePassword } from "../services/login.service";
import config from "config";
import { signJWT } from "../utils/jwt.utils";

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

    console.log(user)

    return res
      .cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 12,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
      })
      .send(user);
  } catch (error: any) {
    if (error.custom) {
      res.status(error.status);
    }
    res.send(error);
  }
}
