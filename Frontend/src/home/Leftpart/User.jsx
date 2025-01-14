import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-blue-300 duration-300 ${
        isSelected ? "bg-white" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
      role="button"
      aria-selected={isSelected}
      aria-label={`Select conversation with ${user.fullname}`}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-white duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            {/* Dynamic profile picture with fallback */}
            <img
              src={user.profile_pic || "/default-profile-pic.jpg"}
              alt={`${user.fullname}'s Profile`}
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <h3 className="text-black">{user.fullname}</h3>
          {isOnline && <p className="text-green-500">Online</p>}
        </div>
      </div>
    </div>
  );
}

export default User;
