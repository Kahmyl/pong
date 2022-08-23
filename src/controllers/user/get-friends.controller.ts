// import { Request, Response } from "express";
// import { getFriend } from "../../services/profile.service";

// export async function getUserFriends(req: Request, res: Response) {
//   try {
//     const user = await getFriend(req.params.userId);
//     if (user && user.followings) {
//       const friends = await Promise.all(
//         user.followings.map((friendId: any) => {
//           return getFriend(friendId);
//         })
//       );

//       const friendList: any[] = [];
//       if (friends) {
//         friends.map((friend: any) => {
//           const { _id, username, profilePicture } = friend;
//           friendList.push({ _id, username, profilePicture });
//         });
//       }

//       res.json(friendList);
//     }
//   } catch (error: any) {
//     res.status(500).json(error);
//   }
// }
