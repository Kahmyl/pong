import {UserDocument} from '../models/types'
import User from '../models/user.model' 
import { omit } from 'lodash';

export async function validatePassword({
    identity,
    password,
}: {
    identity: UserDocument["email"] | UserDocument["name"];
    password: string;
}) {
    const user = await User.findOne({email: identity}) || await User.findOne({name: identity})

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid){
        return false;
    }

    return omit(user.toJSON(), "password");
}