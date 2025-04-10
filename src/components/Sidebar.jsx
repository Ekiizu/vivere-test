import React, { useState, useEffect } from "react";
import NotifModal from "./NotifModal";
import PostModal from "./PostModal";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = ({ setPostStyle }) => {
  const [theme, setTheme] = useState(localStorage.getItem("currentTheme") || "default");

  const changeTheme = (e) => {
    setTheme(e.target.value);
  };

  const togglePostStyle = () => {
    setPostStyle((prevStyle) => (prevStyle === "full" ? "masonry" : "full")); 
    console.log(`Post style changed to: ${prevStyle === "full" ? "masonry" : "full"}`); // logs the new style
  };

  useEffect(() => {
    localStorage.setItem("currentTheme", theme);
  }, [theme]);

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

          <Link to="/profile" className="flex items-center justify-center btn btn-ghost">
            <i className="fas fa-circle-user fa-xl" />
          </Link>

          {/* Notification Button */}
          <button
            className="flex items-center justify-center btn btn-ghost"
            onClick={() => document.getElementById("my_modal_1").showModal()} // Open the notification modal by id
          >
            <i className="fas fa-bell fa-xl" />
          </button>
          <NotifModal id="notif_modal" />

          {/* Post Button */}
          <button
            className="flex items-center justify-center btn btn-ghost"
            onClick={() => document.getElementById("my_modal_3").showModal()} // Open the post modal by id
          >
            <i className="fas fa-square-plus fa-xl" />
          </button>
          <PostModal id="post_modal" />
        </div>
      </div>

      {/* Post Style Switcher */}
      <div className="mt-6">
        <button
          className="btn btn-primary w-full"
          onClick={togglePostStyle} // Toggle post style when you click
        >
          Toggle Post Style
        </button>
      </div>

      <input type="checkbox" defaultChecked className="toggle" />

      {/* Bottom Section - Settings Icon */}
      <div>
        <div className="dropdown justify-center mb-72">
        <div tabIndex={0} role="button" className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="System Default"
                checked={theme === "default"}
                value="default"
                onChange={(e) => setTheme(e.target.value)} // Update theme state
              />
            
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Light"
                checked={theme === "light"}
                value="light"
                onChange={(e) => setTheme(e.target.value)} // Update theme state
              />
              
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Dark"
                checked={theme === "coffee"}
                value="coffee"
                onChange={(e) => setTheme(e.target.value)} // Update theme state
              />
          
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Retro"
                checked={theme === "retro"}
                value="retro"
                onChange={(e) => setTheme(e.target.value)} // Update theme state
              />
              
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                checked={theme === "cyberpunk"}
                value="cyberpunk"
                onChange={(e) => setTheme(e.target.value)} // Update theme state
              />
            
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Valentine"
                checked={theme === "valentine"}
                value="valentine"
                onChange={(e) => setTheme(e.target.value)} // Update theme state
              />
              
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Aqua"
                checked={theme === "aqua"}
                value="aqua"
                onChange={(e) => setTheme(e.target.value)} // Update theme state
              />
            
            </label>
          </li>
        </ul>
      </div>

        <Link to="/settings" className="flex items-center justify-center btn btn-ghost">
          <i className="fas fa-cog fa-xl" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;