import React, { useState, useRef } from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Logout from "./home/left1/Logout";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const [authUser] = useAuth();
  const [leftWidth, setLeftWidth] = useState(300); // Initial width for the Left component
  const isResizing = useRef(false);

  // Handlers for resizing
  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      const newWidth = e.clientX;
      if (newWidth > 150 && newWidth < window.innerWidth - 200) {
        setLeftWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <Routes>
        {/* Home route - Protect with authUser */}
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout />

                {/* Left Panel: Render Left Component */}
                <div
                  className="bg-blue-300 overflow-y-auto"
                  style={{ width: `${leftWidth}px` }}
                >
                  <Left leftWidth={leftWidth} /> {/* Pass leftWidth as prop */}
                </div>

                {/* Slider */}
                <div
                  className="bg-gray-300 cursor-col-resize w-2"
                  onMouseDown={handleMouseDown}
                ></div>

                {/* Right Panel: Render Right Component */}
                <div className="flex-1 bg-white">
                  <Right />
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        {/* Login route - Redirect to home if already authenticated */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        {/* Signup route - Redirect to home if already authenticated */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
