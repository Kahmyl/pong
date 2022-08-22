import { Request, Response } from "express";
import { userProfile } from "../../services/profile.service";
import { omit } from "lodash";

export async function getUserProfile(req: Request, res: Response) {
  try {
    const { name }: { name?: string } = req.query;
    const user = await userProfile({ input: name });
    if (user) {
      const result = await omit(user.toJSON(), "password");
      res.send(result);
    } else {
      res.send("failed");
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}
