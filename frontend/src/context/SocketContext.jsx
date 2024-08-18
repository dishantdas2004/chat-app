// npm i socket.io-client 
// it is for the frontend so that we can have communication to our socket server



import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";


const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser} = useAuthContext()

    useEffect(() => {
        if(authUser){
            const socket = io("http://localhost:3000", {
                query: {
                    userId: authUser.id
                }
            })
            setSocket(socket)

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close()
        } else {
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
        console.log(onlineUsers)

    }, [authUser])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}