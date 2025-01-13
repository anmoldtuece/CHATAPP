import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [profilePic, setProfilePic] = useState(""); // State to store profile picture URL
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const handleUpload = async (event) => {
    setIsUploading(true);
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat app");
    data.append("cloud_name", "dfihopibe");

    try {
      console.log("Uploading file to Cloudinary...");
      const res = await fetch("https://api.cloudinary.com/v1_1/dfihopibe/image/upload", {
        method: "POST",
        body: data,
      });

      const uploadedImage = await res.json();
      console.log("Cloudinary Response: ", uploadedImage);

      if (uploadedImage.url) {
        setProfilePic(uploadedImage.url); // Set profile picture URL
        toast.success("Profile picture uploaded successfully");
        console.log("Profile Pic URL Set: ", uploadedImage.url);
      } else {
        toast.error("Failed to retrieve uploaded image URL");
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      toast.error("Failed to upload profile picture");
    }
    setIsUploading(false);
  };

  const onSubmit = async (data) => {
    if (!profilePic) {
      toast.error("Please upload a profile picture before signing up.");
      return;
    }

    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      profile_pic: profilePic,
    };

    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
        >
          <h1 className="text-2xl items-center text-blue-600 font-bold">
            Messenger
          </h1>

          <h2 className="text-2xl items-center">
            Create a new{" "}
            <span className="text-blue-600 font-semibold">Account</span>
          </h2>

          {/* Fullname */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Fullname"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}

          {/* Confirm Password */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="confirm password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              onChange={handleUpload}
              required
            />
            {isUploading && <p className="text-blue-500">Uploading...</p>}

            {/* Display the uploaded profile image in a circular format */}
            {profilePic && (
              <div className="mt-4">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <input
              type="submit"
              value="Signup"
              className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2"
            />
          </div>
          <p>
            Have an Account?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 underline cursor-pointer ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
