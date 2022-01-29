import { UserDocument } from "../models/types";

export interface PostPayload{
    userId: UserDocument["_id"];
    desc: string;
    img: string;
}

export interface UpdatePayload{
    desc: string;
    img: string;
}