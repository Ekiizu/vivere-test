import { useState } from "react";
import "../App.css";
import Card from "../components/Card";



function Home() {
  const [count, setCount] = useState(0);

  const images = [
    
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    
  ];

  return (
<div>
      {/* Main Content Area */}
      <div className="ml-48 mt-16 flex-1 p-5">


        {/* Masonry Image Layout with Smaller Images */}
        

          <Card></Card>
     
        
      </div>
    </div>
  );
}

export default Home;

