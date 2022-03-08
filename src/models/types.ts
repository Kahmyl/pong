import mongoose from 'mongoose'

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    profilePicture: string;
    coverPicture: string;
    followers: any[];
    followings: [];
    desc: string;
    from: string;
    city: string;
    relationships: number;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
} 

export interface PostDocument extends mongoose.Document{
    userId: UserDocument["_id"];
    desc: string;
    img: string;
    likes: UserDocument["_id"][];
}