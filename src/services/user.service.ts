import { DocumentDefinition } from 'mongoose';
import {UserDocument} from '../models/types'
import User from '../models/user.model'
import { omit } from 'lodash';
import {get} from "lodash"
import config from 'config'
import { verifyJWT, signJWT } from '../utils/jwt.utils';
// import Session from '../model/session.model'

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try{
        return await User.create(input);
    } catch(error: any){
        throw new Error(error)
    }
}



export async function resetAccessToken({refreshToken}:{refreshToken: string}): Promise<any>{
    const { decoded } = verifyJWT(refreshToken)
    if(!decoded){
        return false;
    }


    const user = await User.findOne({_id: get(decoded, "_id")});

    if(!user){
        return false;
    }

    const result = await omit(user.toJSON(), "password")

    const accessToken = signJWT(
        { ...result }, 
        {expiresIn: config.get("accessTokenTl")}
    );

    return accessToken
}