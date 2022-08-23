import mongoose from "mongoose";
import { PostDocument } from "./types";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, strict: false }
);

const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;
