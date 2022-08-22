import { DocumentDefinition } from "mongoose";
import { UserDocument } from "../models/types";
import User from "../models/user.model";
import { omit } from "lodash";
import { get } from "lodash";
import config from "config";
import { UnAuthorizedErrorException } from "../common/utils/error-response";
import { signJWT, verifyJWT } from "../common/utils/jwt.utils";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function resetAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<any> {
  const { decoded } = verifyJWT(refreshToken);
  if (!decoded) {
    throw UnAuthorizedErrorException("User is not Authorized");
  }

  const user = await User.findOne({ _id: get(decoded, "_id") });

  if (!user) {
    throw UnAuthorizedErrorException("User is not Authorized");
  }

  const result = await omit(user.toJSON(), "password");

  const accessToken = signJWT(
    { ...result },
    { expiresIn: config.get("accessTokenTl") }
  );

  return accessToken;
}
