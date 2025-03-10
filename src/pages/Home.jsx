import { useState } from "react";
import "../App.css";



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
        <div className="border-2 border-black p-4 rounded"> 

          
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <img
                className="h-64 w-full object-cover rounded-lg" 
                src={src}
                alt={`Gallery image ${index + 1}`}
              />
            </div>
            
            
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

