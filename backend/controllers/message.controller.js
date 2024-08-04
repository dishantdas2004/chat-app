import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'

export const sendMessage = async(req, res) => {
    try {
        const {message} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id 
        // now we can use req.user._id because we have set in the protectRoute function

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
            // find a conversation array where participants fields includes all these fields
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        
        await conversation.save()

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // socket io functionality will go here

        // await conversation.save()
        // await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()])
        // this will run in parallel

        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const getMessages = async(req, res) => {
    try {
        
        const senderId = req.user._id
        const {id: userToChatId} = req.params

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages")
        // populate will fill the messages array with objects from the message model
        //not reference but actual messages

        if(!conversation){
            return res.status(200).json([])
        }

        const messages = conversation.messages
        
        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}