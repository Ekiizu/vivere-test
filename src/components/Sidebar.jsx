import React, { useState } from "react"; 
import NotifModal from "./NotifModal";
import { Link } from "react-router-dom";

import "../App.css";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState();

  const toggleModal = () => {
    console.log("Testing Modal"); 
    setIsModalOpen(!isModalOpen);
  };

  const changeTheme = (e) => {
    setTheme(e.target.value);
    localStorage.setItem("currentTheme", theme)
    console.log(localStorage.getItem("currentTheme"))

  }
  
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

          <button 
            onClick={console.log("help")}
            className="flex items-center justify-center btn btn-ghost"
          >
            <i className="fas fa-square-plus fa-xl" />

          </button>

          {/* <Link to="/post" className="flex items-center justify-center btn btn-ghost">
          </Link> */}
        </div>
      </div>

      {/* Bottom Section - Settings Icon */}
      <div>
      <div className="dropdown mb-72" onChange={changeTheme}>
        <div tabIndex={0} role="button" className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048">
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Default"
              value="default" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Retro"
              value="retro" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Cyberpunk"
              value="cyberpunk" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Valentine"
              value="valentine" />
          </li>
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Aqua"
              value="aqua" />
          </li>
        </ul>
      </div>

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


