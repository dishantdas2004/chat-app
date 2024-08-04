import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js'

const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()

app.use(express.json()) // to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.get("/", (req,res) => {
    //root route http://localhost:3000/
    res.send("Chat App")
})



app.listen(PORT, async() => {
    await connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})