import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../App.css";

const ProfileComponent = () => {
  const navigate = useNavigate(); 

  const user = JSON.parse(localStorage.getItem("user"));

  const images = [
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
  ];

  return (
    <div className="max-w-2xl mx-auto rounded-sm overflow-hidden">
      {/* Banner */}
      <div className="relative">
        <img
          src="images/ozzypaw.jpg"
          alt="Banner"
          className="h-48 w-full object-cover"
        />
        <img
          src="images/ozzy.jpg"
          alt="User Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-12 shadow-md ml-50"
        />
      </div>

      <div style={{background: `linear-gradient(to bottom, ${user.colour1}, ${user.colour2})`}} className="p-6 min-h-102 text-center">
        {/* User Info */}
        {console.log(user.username)}
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <h3 className="text">@Ekiizu</h3>

        {/* Edit and Logout Buttons */}
        <div className="mt-4 flex justify-center space-x-3">
          <button className="px-4 py-2 bg-accent text-white rounded-lg shadow-md hover:bg-yellow-600 transition">
            Edit
          </button>
          <button
            className="px-4 py-2 bg-accent text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
            onClick={() => navigate("/login")} 
          >
            Logout
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-4 text-primary">
          <a href="#" className="hover:underline font-medium">Instagram</a>
          <a href="#" className="hover:underline font-medium">Twitter</a>
          <a href="#" className="hover:underline font-medium">Ko-fi</a>
        </div>

        {/* Bio Section */}
        <div className="mt-6 p-4 border-t">
          <p className="text-sm">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
