import mongoose from "mongoose";

const message = mongoose.Schema({
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    readBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    } 
}, {timestamps: true});
const Message = mongoose.model("Message", message);
export default Message;