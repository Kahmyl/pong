import { UserDocument } from "../models/types";
import User from "../models/user.model";
import { omit } from "lodash";
import {
  NotFoundErrorException,
  UnAuthorizedErrorException,
} from "../common/utils/error-response";

export async function validatePassword({
  identity,
  password,
}: {
  identity: UserDocument["email"] | UserDocument["name"];
  password: string;
}) {
  const user =
    (await User.findOne({ email: identity })) ||
    (await User.findOne({ name: identity }));
  if (!user) {
    throw NotFoundErrorException("User does not exist");
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    throw UnAuthorizedErrorException("Incorrect Credentials");
  }

  return omit(user.toJSON(), "password");
}
