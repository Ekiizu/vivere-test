import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Card from "../components/Card.jsx"
import ProfileComponent from "../components/ProfileComponent.jsx"

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user data
  const [banner, setBanner] = useState(""); // Store banner GIF

  useEffect(() => {
    const fetchUser = async () => {
      try {Users
        const response = await fetch("https://viverebackend-main-girysq.laravel.cloud/", {
          credentials: "include", // Include cookies for auth
        });
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data); // user data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchGif = async () => {
      try {
        // const API_KEY = "LyXmyl9nY7CVVj1wzxnSpVwv3cptUaox";
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`
        );
        const data = await response.json();
        setBanner(data.data.images.original.url); 
      } catch (error) {
        console.error("Error fetching GIF:", error);
      }
    };

    fetchUser();
    fetchGif();
  }, []);

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
  <div className="ml-48 mt-16 p-5 flex gap-6">
  {/* User Posts Section */}
  
  <Card></Card>
  


      {/* Profile Section with Banner */}
      <div className="w-140 border-2 border-black rounded">
       <ProfileComponent> </ProfileComponent>
      </div>
    </div>
  );
}

export default Profile;
