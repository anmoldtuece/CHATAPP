import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null); // Reset the error before making the request
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("https://chatapp-1y9j.onrender.com/api/user/allusers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users");
        console.log("Error in useGetAllUsers: " + error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []); // This will only run once when the component mounts

  return { allUsers, loading, error };
}

export default useGetAllUsers;
