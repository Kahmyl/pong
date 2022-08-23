import { EditPassword } from "./types";
import { UserDocument } from "../models/types";
import User from "../models/user.model";
import {
  ServerErrorException,
  UnAuthorizedErrorException,
} from "../common/utils/error-response";
import { omit } from "lodash";

export async function editPassword(
  userId: UserDocument["_id"],
  input: EditPassword,
  oldPassword: string
) {
  const user = await User.findById(userId);
  const isValid = user && (await user.comparePassword(oldPassword));
  if (!isValid) {
    throw UnAuthorizedErrorException("Incorrect Credentials");
  }
  const updatedUser = await User.findByIdAndUpdate(userId, { $set: input });
  if (!updatedUser) {
    throw ServerErrorException("Something went wrong");
  }
  return omit(updatedUser.toJSON(), "password");
}

export async function userProfile({ input }: { input?: UserDocument["_id"] }) {
  const user = await User.findById({ _id: input })
    .populate("followings", "_id, name")
    .populate("followers", "_id, name");

  if (!user) {
    throw ServerErrorException("Something went wrong");
  }

  return user;
}

export async function getFriend(userId: UserDocument["_id"]) {
  try {
    return await User.findById(userId);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function singleFriend(userId: UserDocument["_id"]) {
  return await User.findById(userId)
    .populate("followings", "_id, name")
    .populate("followers", "_id, name");
}
