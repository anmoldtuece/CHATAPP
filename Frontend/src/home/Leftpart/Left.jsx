import React from "react";
import Search from "./Search";
import Users from "./Users";
 

function Left() {
  return (
    <div className="w-[30%] bg-blue-300 text-black">
      <h1 className="font- text-3xl p-2 px-11">Vibe Chat</h1>
    {/* <div className="w-full   bg-black text-gray-300"> */}
      <Search />
      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
   
    </div>
  
  );
}

export default Left;
