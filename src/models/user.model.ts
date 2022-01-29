import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'
import { UserDocument } from './types'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    name: {
        type: String, 
        required: true 
    },
    password: {
        type: String, 
        required: true
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
}, {timestamps: true});

UserSchema.pre("save", async function(next){
    let user = this as UserDocument;

    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

UserSchema.methods.comparePassword = async function ( candidatePassword: string ): Promise<boolean> {
   const user = this as UserDocument;

   return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const User = mongoose.model<UserDocument>("User", UserSchema)

export default User