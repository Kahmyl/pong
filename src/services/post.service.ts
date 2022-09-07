import Post from "../models/post.model";
import { PostDocument, UserDocument } from "../models/types";
import { PostPayload, UpdatePayload } from "./types";

export async function getPosts() {
  return await Post.find({})
    .populate("userId", ["name", "id"])
    .populate("likes", ["name", "id"]);
}

export async function getUserPosts(userId: UserDocument["_id"]) {
  return await Post.find({ userId })
    .populate("userId")
    .populate("likes", ["name", "id"]);
}

export async function singlePost(postId: PostDocument["_id"]) {
  return Post.findById({ _id: postId })
    .populate("userId", ["name", "id"])
    .populate("likes", ["name", "id"]);
}

export async function createPost(input: PostPayload) {
  try {
    return await Post.create(input);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
