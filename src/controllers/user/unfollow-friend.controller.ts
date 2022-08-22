import { Request, Response } from "express";
import { getFriends } from "../../services/profile.service";

export async function unFollowUser(req: Request, res: Response) {
  if (res.locals.user && res.locals.user._id) {
    const followerId = res.locals.user._id;
    if (res.locals.user._id !== req.params.id) {
      try {
        const user = await getFriends(req.params.id);
        const currentUser = await getFriends(res.locals.user._id);
        if (user && currentUser && user.followers.includes(followerId)) {
          await user.updateOne({ $pull: { followers: followerId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json(`${user.name} has been unfollowed`);
        } else {
          res.status(403).json("you don't follow this user");
        }
      } catch (error: any) {
        res.status(500).json(error);
      }
    } else {
      res.send("You cannot unfollow yourself");
    }
  } else {
    res.send("You are not logged in");
  }
}
