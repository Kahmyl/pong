import { Request, Response } from 'express';
import { createPost, getPosts, singlePost } from '../../services/post.service'
import { PostType } from '../types';

export async function PostsHandler(req:Request, res:Response) {
    const posts = await getPosts();

    return res.send(posts)
}

export async function SinglePostHandler(req:Request, res:Response) {
    const postId = req.params.postId

    const post = await singlePost(postId)

    return res.send(post)
}

export async function createPostHandler(req:Request, res:Response) {
    const {img, desc}: PostType = req.body
    if (res.locals.user && res.locals.user._id){
        const post = await createPost({
            userId: res.locals.user._id,
            img: img,
            desc: desc
        })
        
        return res.send(post)
    } 
    else{
        return res.send("not logged in")
    }
}

export async function updatePostHandler(req:Request, res:Response) {
    const postId = req.params.postId
    if (res.locals.user && res.locals.user._id){
        const user = res.locals.user._id
        const post = await singlePost(postId)
        if (post && post.userId._id == user) {
            await post.updateOne({ $set: req.body });
            return res.status(200).json("the post has been updated");
        } else {
          return res.status(403).json("you can update only your post");
        }
    } 
    else{
        return res.send("not logged in")
    }
}

export async function deletePostHandler(req:Request, res:Response) {
    const postId = req.params.postId
    if (res.locals.user && res.locals.user._id){
        const user = res.locals.user._id
        const post = await singlePost(postId)
        if (post && post.userId._id == user) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
          res.status(403).json("you can delete only your post");
        }
    } 
    else{
        return res.send("not logged in")
    }
}

export async function LikeHandler (req:Request, res:Response) {
    try {
      const postId = req.params.postId
      if (res.locals.user && res.locals.user._id){
        const user = res.locals.user._id
        const post = await singlePost(postId)
        if (!post.likes.includes(user)) {
            await post.updateOne({ $push: { likes: user } });
            res.status(200).json("The post has been liked");
        } else {
          await post.updateOne({ $pull: { likes: user } });
          res.status(200).json("The post has been disliked");
        }
      } else{
        return res.send("not logged in")
      }  
    } catch (err) {
      res.status(500).json(err);
    }
};


