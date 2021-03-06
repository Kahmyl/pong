import { Express, Request, Response } from "express"
import { createUserHandler, getAuthUser } from "./controllers/user.controller";
import { createLoginHandler } from "./controllers/login.controller";
import { 
    createPostHandler, 
    PostsHandler, 
    SinglePostHandler, 
    updatePostHandler,
    deletePostHandler,
    LikeHandler 
} from "./controllers/post.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";
import { createLoginSchema } from "./schema/login.schema";
import { 
    updatePasswordHandler , 
    getUserProfile, 
    getUserFriend, 
    followUser, 
    unFollowUser
} from "./controllers/profile.controller";

export default function (app: Express) {
    app.get("/health", (req:Request, res:Response) => {
        res.sendStatus(200)
    });

    app.get("/api/user", getAuthUser)

    app.post("/api/register", validateRequest(createUserSchema), createUserHandler)

    app.post("/api/login", validateRequest(createLoginSchema), createLoginHandler)

    app.get("/api/posts", PostsHandler)

    app.get("/api/post/:postId", SinglePostHandler)

    app.post("/api/post/create", createPostHandler)

    app.put("/api/post/update/:postId", updatePostHandler)

    app.delete("/api/post/delete/:postId", deletePostHandler)

    app.put("/api/post/:postId/like", LikeHandler)

    app.put("/api/user/pass/:userId", updatePasswordHandler )

    app.get("/api/user/profile", getUserProfile)

    app.get("/api/friend/:userId", getUserFriend )

    app.put("/api/:id/follow", followUser )

    app.put("/api/:id/unfollow", unFollowUser )

}


