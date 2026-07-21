import mongoose from "mongoose"
import config from "./config.js"

async function connectDB() {
    try {
        await mongoose.connect(config.mongodbUrl)
    } catch (error) {
        console.error(eror.message)

        process.exit(1)
    }

}

export default connectDB;