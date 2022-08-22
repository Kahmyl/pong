import { Request, Response } from "express";
import { getFriends } from "../../services/profile.service";

export async function followUser(req: Request, res: Response) {
  if (res.locals.user && res.locals.user._id) {
    const followerId = res.locals.user._id;
    if (res.locals.user._id !== req.params.id) {
      try {
        const user = await getFriends(req.params.id);
        const currentUser = await getFriends(res.locals.user._id);
        if (user && currentUser && !user.followers.includes(followerId)) {
          await user.updateOne({ $push: { followers: followerId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json(`${user.name} has been followed`);
        } else {
          res.status(403).json("you already follow this user");
        }
      } catch (error: any) {
        res.status(500).json(error);
      }
    } else {
      res.send("You cannot follow yourself");
    }
  } else {
    res.send("You are not logged in");
  }
}
