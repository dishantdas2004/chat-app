import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // it means that the senderId will be an id from User collection
        required: true
    }, 
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // it means that the receiverId will be an id from User collection
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {timestamps: true})
// timestamps give createdAt and updatedAt fields

const Message = mongoose.model("Message", messageSchema)

export default Message