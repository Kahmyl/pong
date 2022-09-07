import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { resetAccessToken } from "../../services/user.service";
import { verifyJWT } from "../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;


  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJWT(accessToken);

  console.log(expired)

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await resetAccessToken({ refreshToken });

    if (newAccessToken) {
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 45,
        httpOnly: true,
      });
    }

    const result = verifyJWT(newAccessToken);
    if (result.decoded) {
      res.locals.user = result.decoded;
    }
  }

  return next();
};

export default deserializeUser;
