import React, { useState, useEffect } from "react"; //had to define this for the edit
import { useNavigate } from "react-router-dom"; 
import "../App.css";
import "../pages/profile/Edit"
import "../pages/profile/Profile"

const ProfileComponent = () => {
  const navigate = useNavigate(); 
  const [isEditing, setIsEditing] = useState(false); //for editing the profile 
  const [banner, setBanner] = useState("");

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

  
  const fetchGif = async (persona) => {
    try {
      const API_KEY = "LyXmyl9nY7CVVj1wzxnSpVwv3cptUaox";
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${persona}=&rating=g`
      );
      const data = await response.json();
      setBanner(data.data.images.original.url); 
    } catch (error) {
      console.error("Error fetching GIF:", error);
    }
  };

  useEffect(() => {
    fetchGif("persona");
}, []);

  return (
    <div className="max-w-2xl mx-auto rounded-sm overflow-hidden">
      {/* Banner */}
      <div className="relative">
        <img
          src={banner}
          alt="Banner"
          className="h-48 w-full object-cover"
        />
        <img
          src="images/ozzy.jpg"
          alt="User Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-accent absolute left-1/2 transform -translate-x-1/2 -bottom-12 shadow-md ml-50"
        />
      </div>

      <div style={{background: `linear-gradient(to bottom, ${user.colour1}, ${user.colour2})`}} className="p-6 min-h-180 text-center"> 
        {/* hardcoded the size of the gradient for now */}
        {/* User Info */}
        {console.log(user.username)}
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <h3 className="text">@Ekiizu</h3>

        {/* Edit and Logout Buttons */}
        <div className="mt-4 flex justify-center space-x-3">
        <button
      className="px-4 py-2 bg-accent text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
 
     onClick={() => navigate("/profile/edit")} // Navigate instead of modal
     >
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
