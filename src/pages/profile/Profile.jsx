import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Card from "../../components/Card.jsx"
import ProfileComponent from "../../components/ProfileComponent.jsx"
import Edit from "./Edit.jsx";


function Profile( {}) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) // logged in user details

  const [size, setSize] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0); // Track initial mouse position

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {Users
  //       const response = await fetch("https://viverebackend-main-girysq.laravel.cloud/", {
  //         credentials: "include", // Include cookies for auth
  //       });
  //       if (!response.ok) throw new Error("Failed to fetch user data");

  //       const data = await response.json();
  //       setUser(data); // user data
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };


  // }, []);

  const images = [
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
  ];

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
      // console.log(newSize);
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

  return (
  // console.log(localStorage.getItem("user")),
  <div className="ml-48 mt-16 p-5 flex gap-6">
  {/* User Posts Section */}
  

  <Card initialSize={size} isProfile={true} userId={user.id}></Card>
  
      {/* Resizer Divider */}
      <div
        style={{ width: "5px", cursor: "ew-resize" }}
        onMouseDown={handleMouseDown}
        className="border-1 border-neutral bg-primary"
      />

      {/* Profile Section with Banner */}
      <div style={{ width: `${size}px` }} className="w-140 border-3 border-primary rounded">
       <ProfileComponent> </ProfileComponent>
      </div>
    </div>
  );
}

export default Profile;
