import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../../services/user.service";
import config from "config";
import log from "../../log";
import { signJWT } from "../../common/utils/jwt.utils";

export async function getAuthUser(req: Request, res: Response) {
  if (res.locals.user && res.locals.user._id) {
    const userId = res.locals.user._id;
    const name = res.locals.user.name;
    const email = res.locals.user.email;

    return res.send({ userId, name, email });
  } else {
    return res.send("not logged in");
  }
}

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

    return res
      .cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 12,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
      })
      .send(result);
  } catch (e: any) {
    log.error(e);
    return res.status(400).send(e.message);
  }
}
