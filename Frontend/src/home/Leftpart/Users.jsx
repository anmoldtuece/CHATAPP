import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (!allUsers.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600">No users found.</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <h1 className="px-8 py-2 text-white font-semibold bg-blue-300 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
