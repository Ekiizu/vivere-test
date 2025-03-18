import React, { useState, useEffect } from "react"; 
import NotifModal from "./NotifModal";
import PostModal from "./PostModal";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('currentTheme') || 'default'
  );

  const toggleNotifModal = () => {
    setIsNotifModalOpen(!isNotifModalOpen);
  };

  const togglePostModal = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };

  const changeTheme = (e) => {
    setTheme(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem('currentTheme', theme);
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
            onClick={toggleNotifModal}
            className="flex items-center justify-center btn btn-ghost"
          >
            <i className="fas fa-bell fa-xl" />
          </button>
          {isNotifModalOpen && <NotifModal isOpen={isNotifModalOpen} toggleModal={toggleNotifModal} />}

          {/* Post Button */}
          <button 
            onClick={togglePostModal}
            className="flex items-center justify-center btn btn-ghost"
          >
            <i className="fas fa-square-plus fa-xl" />
          </button>
          {isPostModalOpen && <PostModal isOpen={isPostModalOpen} toggleModal={togglePostModal} />}
        </div>
      </div>

      {/* Bottom Section - Settings Icon */}
      <div>
        <div className="dropdown justify-center mb-72" onChange={changeTheme}>
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
              <input type="radio" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" checked={theme === "default"} value="default" />
            </li>
            <li>
              <input type="radio" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" checked={theme === "retro"} value="retro" />
            </li>
            <li>
              <input type="radio" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" checked={theme === "cyberpunk"} value="cyberpunk" />
            </li>
            <li>
              <input type="radio" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" checked={theme === "valentine"} value="valentine" />
            </li>
            <li>
              <input type="radio" name="theme-dropdown" className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" checked={theme === "aqua"} value="aqua" />
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


//still need to figure out how to connect modals onto buttons directly 18TH MARCH 