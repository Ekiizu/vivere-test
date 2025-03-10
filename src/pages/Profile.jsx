import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Profile({ initialSize }) {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0); // Track initial mouse position
  const navigate = useNavigate();

  const images = [
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
  ];

  // Start resizing
  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX); // Record the initial position of the mouse
    document.body.style.userSelect = "none"; // disables selecting
  };

  // Resizing function
  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const movement = e.clientX - startX; // Difference from the starting position
    const newSize = size + movement; // Add the movement to the initial size

    // constrain resizing
    if (newSize > 400 && newSize < window.innerWidth * 0.4) {
      console.log(newSize);
      setSize(newSize);
    }
  };

  // Stop resizing
  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.userSelect = "auto"; // re-enables selecting
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="ml-48 mt-16 p-5 flex gap-6 w-full">
      {/* User Posts Section */}
      <div
        style={{ width: `${size}px` }}
        className="flex-shrink-0 border-2 border-black p-4 rounded"
      >
        <h2 className="text-xl font-bold mb-4 text-primary">User's Posts</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <img
                className="h-64 w-full object-cover rounded-lg"
                src={src}
                alt={`User post ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Resizer Divider */}
      <div
        style={{ width: "10px", cursor: "ew-resize" }}
        onMouseDown={handleMouseDown}
        className="border-2 bg-gray-500"
      />

      {/* Profile Section with Banner */}
      <div
        className="border-2 border-black rounded flex-1"
        style={{
          flexGrow: 1, // Ensure the right panel takes up remaining space
        }}
      >
        <div className="banner">
          <img
            src="images/ozzybed.jpg"
            alt="Banner"
            className="h-48 w-full object-cover rounded-t"
          />
        </div>

        <div className="p-4 flex flex-col items-center text-center">
          <img
            src="images/ozzy.jpg"
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-12"
          />
          <h2 className="text-xl font-bold mt-2 text-primary">Ekiizu</h2>
          <p className="text-primary">@Ekiizu</p>
          <p className="mt-2 text-sm text-gray-500">Meow</p>
          <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg">
            Follow
          </button>

          {/* Logout Button */}
          <button
            className="mt-3 px-4 py-2 bg-primary text-white rounded-lg"
            onClick={() => navigate("/Login")}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
