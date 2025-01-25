import React, { useState } from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import axios from "axios";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [showProfile, setShowProfile] = useState(false); // Manage profile visibility

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const handleProfileClick = () => {
    setShowProfile((prev) => !prev); // Toggle the profile visibility
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://chatapp-1y9j.onrender.com/api/user/${userId}`);
      console.log("User Data:", response.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  if (!selectedConversation) {
    return null; // Return nothing if no conversation is selected
  }

  return (
    <div className="pl-5 pt-5 h-[12vh] flex space-x-4 bg-white duration-300 items-center">
      {/* Profile Picture */}
      <div>
        <div
          className="avatar cursor-pointer"
          onClick={() => {
            handleProfileClick();
            fetchUserData(selectedConversation._id); // Fetch user data when profile is clicked
          }}
          role="button"
          aria-expanded={showProfile}
          aria-label={`Toggle profile view for ${selectedConversation?.fullname}`}
        >
          <div
            className={`w-12 rounded-full ${
              onlineUsers.includes(selectedConversation._id) ? "online" : ""
            }`}
          >
            <img
              src={
                selectedConversation?.profile_pic ||
                "https://via.placeholder.com/150" // Fallback image
              }
              alt={`${selectedConversation?.fullname || "User"}'s Profile`}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div>
        <h1 className="text-xl text-black">
          {selectedConversation?.fullname || "Anonymous"}
        </h1>
        <span className="text-sm text-black">
          {getOnlineUsersStatus(selectedConversation._id)}
        </span>
      </div>

      {/* Profile Popup */}
      {showProfile && (
        <div
          className="absolute top-20 left-5 bg-white shadow-md p-4 rounded-md z-10"
          role="dialog"
          aria-label="User Profile"
        >
          <img
            src={
              selectedConversation?.profile_pic ||
              "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover mb-2"
          />
          <h2 className="text-black text-lg font-semibold">
            {selectedConversation?.fullname}
          </h2>
          <p className="text-gray-500">{getOnlineUsersStatus(selectedConversation._id)}</p>
        </div>
      )}
    </div>
  );
}

export default Chatuser;
