import { Request, Response } from 'express';
import { editPassword, userProfile, getFriends } from '../services/profile.service';
import bcrypt from 'bcrypt';
import config from 'config';
import log from '../log'
import { omit } from 'lodash';


export async function updatePasswordHandler(req:Request, res:Response) {
    if (res.locals.user._id === req.params.userId){
        const userId = req.params.userId
        if(req.body.password){
            const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
            const password = await bcrypt.hashSync(req.body.password, salt);
            const input = {password}

            try{
                const user = await editPassword(userId, input);
                res.send('Password has been updated\n'+ user)
            }catch(error: any){
                log.error(error)
                return res.status(400).send(error.message)
            }
        }
    }   
}

export async function getUserProfile(req:Request, res:Response) {
    try{
        const { name }: {name?: string} = req.query
        const user = await userProfile({input: name})
        if(user){
            const result = await omit(user.toJSON(), "password")
            res.send(result)
        }else{
            res.send("failed")
        }
    } catch(error: any){
        res.status(500).json(error);
    }
}

export async function getUserFriend(req:Request, res:Response){
    try{
        const user = await getFriends(req.params.userId)
        if(user && user.followings)
        {
            const friends = await Promise.all(
                user.followings.map((friendId: any) => {
                    return getFriends(friendId);
                })
            )

            const friendList: any[] = [];
            if(friends){
                friends.map((friend: any) => {
                    const { _id, username, profilePicture } = friend;
                    friendList.push({ _id, username, profilePicture });
                })
            }

            res.json(friendList)
        };
    }catch(error: any){
        res.status(500).json(error);
    }
}

export async function followUser(req:Request, res:Response){
    if (res.locals.user && res.locals.user._id){
        const followerId = res.locals.user._id
        if (res.locals.user._id !== req.params.id) {
            try{
                const user = await getFriends(req.params.id)
                const currentUser = await getFriends(res.locals.user._id)
                if (user && currentUser  && !user.followers.includes(followerId)) {
                    await user.updateOne({ $push: { followers: followerId } })
                    await currentUser.updateOne({ $push: { followings: req.params.id } });
                    res.status(200).json(`${user.name} has been followed`);
                }else{
                    res.status(403).json("you already follow this user");
                }
            }catch(error: any){
                res.status(500).json(error);
            }
        }else{
            res.send("You8 cannot follow yourself")
        }
    }else{
        res.send("You are not logged in")
    }
}

export async function unFollowUser(req:Request, res:Response){
    if (res.locals.user && res.locals.user._id){
        const followerId = res.locals.user._id
        if (res.locals.user._id !== req.params.id) {
            try{
                const user = await getFriends(req.params.id)
                const currentUser = await getFriends(res.locals.user._id)
                if (user && currentUser  && user.followers.includes(followerId)) {
                    await user.updateOne({ $pull: { followers: followerId } })
                    await currentUser.updateOne({ $pull: { followings: req.params.id } });
                    res.status(200).json(`${user.name} has been unfollowed`);
                }else{
                    res.status(403).json("you don't follow this user");
                }
            }catch(error: any){
                res.status(500).json(error);
            }
        }else{
            res.send("You cannot unfollow yourself")
        }
    }else{
        res.send("You are not logged in")
    } 
}