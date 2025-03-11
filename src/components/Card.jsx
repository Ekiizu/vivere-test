import React from "react";
import { useState } from "react";
import "../App.css";

// why is initial size an object???
const Card = (initialSize, isProfile) => {
  const [size, setSize] = useState(initialSize);
  const [profile, setProfile] = useState(isProfile);
  
  const images = [
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
  ];
    

  console.log(initialSize)

  // why is initial size an object???????
  if (initialSize.isProfile) {
    return(
    <div style={{width: size}} className="flex-1 border-2 border-black p-4 rounded">
     <h2 className="text-xl font-bold mb-4 text-primary">User's Posts</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg">
            <img
              className="h-64 w-full object-cover rounded-lg transform transition duration-300 ease-in-out group-hover:scale-105"
              src={image}
              alt={`User post ${index + 1}`}
            />

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-lg font-bold
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            >
              {"TESTING"}
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }
  else {
  return (
    
    <div style={{width: size}} className="flex-1 border-2 border-black p-4 rounded">
     {/* <h2 className="text-xl font-bold mb-4 text-primary">User's Posts</h2> */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg">
            <img
              className="h-64 w-full object-cover rounded-lg transform transition duration-300 ease-in-out group-hover:scale-105"
              src={image}
              alt={`User post ${index + 1}`}
            />

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-lg font-bold
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            >
              {"TESTING"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
};

export default Card;
