import Chat from "../Models/Chat.js";
import User from "../Models/User.js";


export const accessChat = async(req, res) => {
    const {userId} = req.body;

    if(!userId){
        console.log("UserId Not Found!");
        return res.status(500);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq : req.user.id}}},
            {users: { $elemMatch: {$eq: userId}}},
        ],
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name picturePath email",
    });

    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, userId],
        }
        
        try{
            const createChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createChat._id}).populate("users", "-password");
            res.status(200).json(fullChat);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }
}
