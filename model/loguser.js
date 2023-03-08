import mongoose from "mongoose"

const logUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Loguser", logUserSchema)