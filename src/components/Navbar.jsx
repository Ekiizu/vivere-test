import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";


const Navbar = () => {
  
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-48 w-[calc(100%-12rem)] bg-primary shadow-md p-4 flex justify-between">
      <div>
      <a className="btn btn-ghost text-xl">Following</a>
      <a className="btn btn-ghost text-xl">Popular</a>
      <a className="btn btn-ghost text-xl">New</a>
      </div>
      
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-72 border-base-100"
        aria-label="Search"
      />


          {/* <button
            className="ml-4 px-4 py-2 bg-primary text-white rounded-lg"
            onClick={() => navigate("/Login")}
          >
            Logout
          </button> */}
    </div>

    


  );
};

export default Navbar;
