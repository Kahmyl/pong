import { Request, Response } from 'express';
import { validatePassword } from '../services/login.service'
import config from 'config'
import { signJWT } from '../utils/jwt.utils';

export async function createLoginHandler(req:Request, res:Response) {
    const user = await validatePassword(req.body)

    if(!user){
        return res.status(401).send("invalid email or password");
    }

    const accessToken = signJWT(
        {...user }, 
        {expiresIn: config.get("accessTokenTl")}
    );

    const refreshToken = signJWT(
        {...user }, 
        {expiresIn: config.get("refreshTokenTl")}
    );

    return res
           .cookie("accessToken", accessToken,{maxAge: 1000 * 60 * 45, httpOnly: true,})
           .cookie("refreshToken", refreshToken,{maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: true,})
           .send(user)
}