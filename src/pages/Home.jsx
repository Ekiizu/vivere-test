import { useState } from "react";
import "../App.css";
import Card from "../components/Card";
import NotifModal from "../components/NotifModal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
        <Card />
        <button className="btn" onClick={toggleModal}>Open Notification Modal</button>
      </div>
      <NotifModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
}

export default Home;

