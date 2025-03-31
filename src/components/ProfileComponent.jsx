import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../pages/profile/Edit";
import "../pages/profile/Profile";
import "../pages/profile/View";

const ProfileComponent = ({ userProfile }) => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));




  // Determines which user data to display
  const user = userProfile || loggedInUser;

  const [banner, setBanner] = useState(user.banner_url);


 //Changing to Tenor API so users can search and change the profile banners
  // const fetchGif = async () => {
  //   try {
  //     const API_KEY = "AIzaSyBh2lFfxgUV--YM1TD22h53wqlsX2aeGVQ"; 
  //     const response = await fetch(
  //       `https://tenor.googleapis.com/v2/search?q=reactjs&key=${API_KEY}&limit=1`
  //     );
  //     const data = await response.json();
  //     setBanner(data.results[0]?.media_formats?.gif?.url || "images/default-banner.jpg"); 
  //   } catch (error) {
  //     console.error("Error fetching GIF:", error);
  //     setBanner("images/ozzybed.jpg"); 
  //   }
  // };

  // useEffect(() => {
  //   fetchGif("");
  // }, []);

  return (
    <div className="max-w-2xl mx-auto rounded-sm overflow-hidden">
      {/* Banner */}
      <div className="relative">
        {banner != null 
        ? <img src={user.banner_url} alt="Banner" className="h-48 w-full object-cover" />
        : <div className="h-48 w-full object-cover " style={{
          background: `${user.colour1}`,
        }} />
        }
        {/* <img src={user.banner_url} alt="Banner" className="h-48 w-full object-cover" /> */}
        <img
          src="images/ozzy.jpg"
          alt="User Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-accent absolute left-1/2 transform -translate-x-1/2 -bottom-12 shadow-md ml-50"
        />
      </div>

      <div
        style={{
          background: `linear-gradient(to bottom, ${user.colour1}, ${user.colour2})`,
        }}
        className="p-6 min-h-180 text-center"
      >
        <h1 className="text-2xl font-bold">{user.username}</h1>
        {/* <h3 className="text">@Ekiizu</h3> */}

        {/* Edit and Logout Buttons */}
        {!userProfile && (
        <div className="mt-4 flex justify-center space-x-3">
          <button
            className="px-4 py-2 bg-accent text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
            onClick={() => navigate("/profile/edit")}
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
        )}

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


