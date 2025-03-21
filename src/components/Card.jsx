import React from "react";
import "../App.css";

const Card = ({ initialSize, isProfile }) => {
  const size = initialSize; 
  // updates from Profile
  const images = [
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozbox.jpg",
  ];

  return (
    <div style={{ width: `${size}px` }} className="flex-1 border-2 border-primary p-4 rounded">
      {isProfile && <h2 className="text-xl font-bold mb-4 text-primary">User's Posts</h2>}
      <div className="masonry-grid">
        {images.map((image, index) => (
          <div key={index} className="masonry-item relative group overflow-hidden rounded-lg">
            <img
              className="object-cover w-full rounded-lg transform transition duration-300 ease-in-out group-hover:scale-105"
              src={image}
              alt={`User post ${index + 1}`}
            />
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
  );
};

export default Card;
