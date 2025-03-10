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

    <div className="banner">
       <img
         src="images/ozzypaw.jpg"
         alt="Banner"
         className="h-48 w-full object-cover rounded-t"
       />
       
    
    
    <div className="p-4 flex flex-col items-center">
    <img
      src="images/ozzy.jpg"
      alt="User Profile"
      className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-12 ml-100"
    />
    

    <h1 className="text-xl font-bold mt-2 text-primary">
      Ekiizu
    </h1>
    
    <h3 className="text-primary"> @Ekiizu </h3>
    <div
        tabIndex={0}
        className="bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content collapse"
        >
        <div className="collapse-title font-semibold">
            <button className="px-4 py-2 bg-primary text-white rounded-lg">Edit</button>
        </div>
        
        <div className="collapse-content text-sm">


        
        <button
        className="px-4 py-2 bg-primary text-white rounded-lg"
        onClick={() => navigate("/Login")}
      >
        Logout
      </button>
        </div>
        </div>

    {/* Social Links */}
    <div className="flex justify-center space-x-4 mt-3 text-primary">
      <a href="#" className="hover:underline">Instagram</a>
      <a href="#" className="hover:underline">Twitter</a>
      <a href="#" className="hover:underline">Ko-fi</a>
    </div>
    <div className="w-130 border-2 border-black rounded">
    <p className="mt-2 text-sm text-gray-500">HELLLOOOO!!!!!!!!!!!</p>
    
    {/* Spotify Embed */}
    <div className="mt-4 w-100">
      <iframe
        src="https://open.spotify.com/embed/track/32NyN0Tby1YpKObfd8nrzN?utm_source=generator"
        width="80%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </div>

    {/* Buttons */}
    <div className="mt-4">
      
      
      
    </div>
  </div>
</div>
</div>


    
  );
}

export default ProfileComponent;
