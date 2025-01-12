import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="pl-5 pt-5 h-[12vh] flex space-x-4 bg-black duration-300">
      <div>
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={
                selectedConversation?.profile_pic || 
                "https://via.placeholder.com/150" // Fallback image
              }
              alt={`${selectedConversation?.name || "User"}'s Profile`}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl text-white">
          {selectedConversation?.fullname || "Anonymous"}
        </h1>
        <span className="text-sm text-gray-400">
          {selectedConversation
            ? getOnlineUsersStatus(selectedConversation._id)
            : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
