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
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            {/* Use dynamic profile picture or fallback */}
            <img
              src={user.profile_pic || "/default-profile-pic.jpg"} // Fallback to a default image
              alt={`${user.fullname}'s Profile`}
            />
          </div>
        </div>
        <div>
          <h3 className="text-white">{user.fullname}</h3>
          {isOnline && <p className="text-green-500">Online</p>}
        </div>
      </div>
    </div>
  );
}

export default User;
