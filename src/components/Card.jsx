import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const Card = ({ initialSize, isProfile, userId}) => {
  const size = initialSize;
  const [posts, setPosts] = useState([]); // State to store user posts
  const token = localStorage.getItem("token"); // Retrieve token for authentication
  const user = userId // logged in user details
  const navigate = useNavigate(); 

  console.log(user)
  // Fetch posts for the current user
  useEffect(() => {
    axios
      .get(`https://viverebackend-main-girysq.laravel.cloud/api/posts-images?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data.data); 
      })
      .catch((err) => {
        console.error("Error fetching user posts:", err);
      });
  }, [token]);

  return (
    <div style={{ width: `${size}px` }} className="flex-1 border-2 border-primary p-4 rounded">
      {isProfile && <h2 className="text-xl font-bold mb-4 text-primary">User's Posts</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
            onClick={() => navigate(`/posts/${post.id}`)} 
          >
            {post.images[0] != null 
            ?
            <img
              className="object-cover w-full h-full rounded-lg transform transition duration-300 ease-in-out group-hover:scale-105"
              src={post.images[0].image_link} 
              alt={`Post ${post.id}`}
            />
            :
            <div>
              <p>{post.description}</p>
            </div>
            }
            <div
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-lg font-bold
              opacity-0 group-hover:opacity-50 transition-opacity duration-300 backdrop-blur-sm"
            >
              {post.title } 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
