import { EditPassword} from './types';
import {UserDocument} from '../models/types'
import User from '../models/user.model'

export async function editPassword(userId:UserDocument["_id"], input: EditPassword) {
    try{
        return await User.findByIdAndUpdate(userId, {$set: input});
        // return ({userId, input})
    } catch(error: any){
        throw new Error(error)
    }
}


export async function userProfile({input}: {input?: UserDocument["name"]}) {
    try{
        return await User.findOne({name: input});
    } catch(error: any){
        throw new Error(error)
    }
}

export async function getFriends(userId: UserDocument['_id']){
    try{
        return await User.findById(userId)
    }catch(error: any){
        throw new Error(error)
    }
}
