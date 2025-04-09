import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import Card from "../../components/Card.jsx";
import ProfileComponent from "../../components/ProfileComponent.jsx";

const ViewProfile = () => {
  const { id } = useParams(); // user ID from the URL
  console.log("ID from the URL!!!", id); 

  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [size, setSize] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem("user")).token;
  
        // Fetch user profile
        const userResponse = await fetch(
          `https://viverebackend-main-girysq.laravel.cloud/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
  
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        console.log(userData.data);
        setUserProfile(userData.data);
  
        // Fetch user posts
        console.log(`Fetching posts for user ID!!!! ${id}`);
        const postsResponse = await fetch(
          `https://viverebackend-main-girysq.laravel.cloud/api/posts?user_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
  
        if (!postsResponse.ok) throw new Error("Failed to fetch posts");
        const postsData = await postsResponse.json();
        setPosts(postsData.data);
  
      } catch (error) {
        console.error("Error fetching profile or posts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [id]);

     // Start resizing
     const handleMouseDown = (e) => {
        setIsResizing(true);
        setStartX(e.clientX); // Record the initial position of the mouse
        document.body.style.userSelect = "none"; // disables selecting
      };
    
      // Resizing function
      const handleMouseMove = (e) => {
        if (!isResizing) return;
    
        const movement = e.clientX - startX; // Difference from the starting position
        const newSize = size - movement; // Add the movement to the initial size
    
        // constrain resizing
        if (newSize > 275 && newSize < window.innerWidth * 0.4) {
          console.log(newSize);
          setSize(newSize);
        }
      };
    
      // Stop resizing
      const handleMouseUp = () => {
        setIsResizing(false);
        document.body.style.userSelect = "auto"; // re-enables selecting
      };
    
      useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }, [isResizing]);
    
    console.log(userProfile)

  return (
    <div className="ml-48 mt-16 p-5 flex gap-6">
      {/* User Posts Section */}
      <Card initialSize={size} isProfile={true} userId={id} posts={posts} />

      {/* Resizer Divider */}
      <div
        style={{ width: "5px", cursor: "ew-resize" }}
        onMouseDown={(e) => {
          setIsResizing(true);
          setStartX(e.clientX);
          document.body.style.userSelect = "none";
        }}
        className="border-1 border-neutral bg-primary"
      />

      {/* Profile Section with Banner */}
      <div
        style={{ width: `${size}px` }}
        className="w-140 border-3 border-primary rounded"
      >
        <ProfileComponent userProfile={userProfile} />
      </div>
    </div>
  );
};

export default ViewProfile;