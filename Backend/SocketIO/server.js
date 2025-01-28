import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// CORS configuration with multiple origins
const io = new Server(server, {
  cors: {
    origin: [
      //"http://localhost:3001", // Local frontend
      "chatapp-flame-seven.vercel.app", // Deployed frontend
    ],
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies, etc.)
  },
});

const users = {};

// Function to get a user's socket ID by their user ID
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

// Socket.IO connection logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Retrieve userId from the handshake query
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id; // Map userId to socket.id
    console.log("Current Users:", users);
  }

  // Emit the list of online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(users));

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) {
      delete users[userId]; // Remove user from the map
    }
    io.emit("getOnlineUsers", Object.keys(users)); // Update online users
  });
});

// Export the server, app, and io for further use
export { app, io, server };
