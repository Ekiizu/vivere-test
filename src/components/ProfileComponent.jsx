import React from "react";
import "../App.css";

const ProfileComponent = () => {
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
    <div className="max-w-2xl mx-auto rounded-lg overflow-hidden">
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

      <div className="p-6 text-center">
        {/* User Info */}
        <h1 className="text-2xl font-bold">Ekiizu </h1>
        <h3 className="text">@Ekiizu</h3>

        {/* Edit and Logout Buttons */}
        <div className="mt-4 flex justify-center space-x-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-yellow-600 transition">
            Edit
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-yellow-600 transition">
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
          <p className="text text-sm">HELLLOOOO!!!!!!!!!!!</p>
        </div>

        {/* Spotify Embed */}
        {/* <div className="mt-4">
          <iframe
            src="https://open.spotify.com/embed/track/32NyN0Tby1YpKObfd8nrzN?utm_source=generator"
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="rounded-lg shadow-md"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileComponent;

