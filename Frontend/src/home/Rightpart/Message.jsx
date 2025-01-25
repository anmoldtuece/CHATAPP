import React, { useEffect, useState } from "react";
import axios from "axios";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const [messageData, setMessageData] = useState(message);
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await axios.get(
          `https://chatapp-1y9j.onrender.com/api/message/details/${message._id}`
        );
        setMessageData(response.data); // update state with additional message info from the backend
      } catch (error) {
        console.error("Error fetching message details:", error);
      }
    };

    if (message._id) {
      fetchMessageDetails();
    }
  }, [message]);

  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {messageData.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
