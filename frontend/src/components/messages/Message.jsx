import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({message}) => {

  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser.id
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ''
  const formattedTime = extractTime(message.createdAt)
  const shakeClass = message.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`${profilePic}`}
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs text-gray-300 flex gap-1 items-center">{formattedTime}</div>
    </div>
  );
};

export default Message;



// STARTER CODE SNIPPET
// import React from "react";

// const Message = () => {
//   return (
//     <div className="chat chat-end">
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="Tailwind CSS chat bubble component"
//             src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//           />
//         </div>
//       </div>
//       <div className={`chat-bubble text-white bg-blue-500`}>Hi! What is up?</div>
//       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:45</div>
//     </div>
//   );
// };

// export default Message;
