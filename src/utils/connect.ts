import mongoose, { ConnectOptions } from "mongoose";
import config from "config"
import log from "../log"

const connect = async () => {
    const dbURI = config.get<string>("dbURI");
    
    return mongoose.connect(dbURI)
    .then(() => {
        log.info("database connected")
    })
    .catch((error) => {
        log.error("database error", error)
        process.exit(1);
    })
}

export default connect;