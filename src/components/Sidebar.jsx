import React, { useState } from "react"; 
import NotifModal from "./NotifModal";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    console.log("Testing Modal"); 
    setIsModalOpen(!isModalOpen);
  };
  
  return (
    <div className="fixed left-0 top-0 h-screen w-48 bg-base shadow-md p-5 flex flex-col justify-between border-r border-base-300">
      {/* Top Section - Logo/Icon */}
      <div>
        <a href="#" className="flex items-center justify-center mb-6 btn btn-ghost btn-outline">
          <i className="fas fa-shield-cat fa-2xl animate-bounce" />
        </a>

        {/* Navigation Icons */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center justify-center btn btn-ghost">
            <i className="fas fa-home fa-xl" />
          </Link>

          <Link to="/Profile" className="flex items-center justify-center btn btn-ghost">
            <i className="fas fa-circle-user fa-xl" />
          </Link>

          {/* Notification Button */}
          <button 
            onClick={toggleModal}
            className="flex items-center justify-center btn btn-ghost"
          >
            <i className="fas fa-bell fa-xl" />
          </button>

          <Link to="/post" className="flex items-center justify-center btn btn-ghost">
            <i className="fas fa-square-plus fa-xl" />
          </Link>
        </div>
      </div>

      {/* Bottom Section - Settings Icon */}
      <div>
        <Link to="/settings" className="flex items-center justify-center btn btn-ghost">
          <i className="fas fa-cog fa-xl" />
        </Link>
      </div>

      {/* Notification Modal (outside of navigation icons) */}
      <NotifModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default Sidebar;


