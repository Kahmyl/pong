import express from "express";
import validateRequest from "../common/middleware/validateRequest";
import { followUser } from "../controllers/user/follow-friend.controller";
import { getFriendProfile } from "../controllers/user/friend-details";
import {
  createLoginHandler,
  logoutHandler,
} from "../controllers/user/login.controller";
import { getUserProfile } from "../controllers/user/profile.controller";
import { unFollowUser } from "../controllers/user/unfollow-friend.controller";
import { updatePasswordHandler } from "../controllers/user/update-password.controller";
import { getUserWithPostHandler } from "../controllers/user/user-posts.controller";
import { createUserHandler } from "../controllers/user/user.controller";
import { createLoginSchema } from "../schema/login.schema";
import { updatePasswordSchema } from "../schema/password.schema";
import { createUserSchema } from "../schema/user.schema";

const userRoute = express.Router();

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

userRoute.post("/logout", logoutHandler);

userRoute.put(
  "/pass",
  validateRequest(updatePasswordSchema),
  updatePasswordHandler
);

userRoute.get("/profile", getUserProfile);

userRoute.get("/user-posts", getUserWithPostHandler);

userRoute.get("/friend/:id/profile", getFriendProfile);

userRoute.put("/:id/follow", followUser);

userRoute.put("/:id/unfollow", unFollowUser);

export default userRoute;
