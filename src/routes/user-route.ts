import express from "express";
import validateRequest from "../common/middleware/validateRequest";
import { followUser } from "../controllers/user/follow-friend.controller";
import { getUserFriend } from "../controllers/user/get-friends.controller";
import { createLoginHandler } from "../controllers/user/login.controller";
import { getUserProfile } from "../controllers/user/profile.controller";
import { unFollowUser } from "../controllers/user/unfollow-friend.controller";
import { updatePasswordHandler } from "../controllers/user/update-password.controller";
import {
  createUserHandler,
  getAuthUser,
} from "../controllers/user/user.controller";
import { createLoginSchema } from "../schema/login.schema";
import { updatePasswordSchema } from "../schema/password.schema";
import { createUserSchema } from "../schema/user.schema";

const userRoute = express.Router();

userRoute.get("/", getAuthUser);

userRoute.post(
  "/login",
  validateRequest(createLoginSchema),
  createLoginHandler
);
userRoute.post(
  "/register",
  validateRequest(createUserSchema),
  createUserHandler
);
userRoute.put(
  "/pass",
  validateRequest(updatePasswordSchema),
  updatePasswordHandler
);

userRoute.get("/profile", getUserProfile);

userRoute.get("/friend/:userId", getUserFriend);

userRoute.put("/:id/follow", followUser);

userRoute.put("/:id/unfollow", unFollowUser);

export default userRoute;
