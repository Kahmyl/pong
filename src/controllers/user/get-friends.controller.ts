import { Request, Response } from "express";
import { getFriends } from "../../services/profile.service";

export async function getUserFriend(req: Request, res: Response) {
  try {
    const user = await getFriends(req.params.userId);
    if (user && user.followings) {
      const friends = await Promise.all(
        user.followings.map((friendId: any) => {
          return getFriends(friendId);
        })
      );

      const friendList: any[] = [];
      if (friends) {
        friends.map((friend: any) => {
          const { _id, username, profilePicture } = friend;
          friendList.push({ _id, username, profilePicture });
        });
      }

      res.json(friendList);
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}
