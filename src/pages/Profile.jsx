import { useNavigate } from "react-router-dom";
import "../App.css";

function Profile() {
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

  return (
    <div className="ml-48 mt-16 p-5 flex gap-6">
      {/* User Posts Section */}
      <div className="flex-1 border-2 border-black p-4 rounded">
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

      {/* Profile Section with Banner */}
      <div className="w-80 border-2 border-black rounded ">
        {/* Banner Section */}
        <div className="banner">
          <img
            src="images/ozzybed.jpg"
            alt="Banner"
            className="h-24 w-full object-cover rounded-t"
          />
          {/* <button className="absolute bottom-1 right-2 text-xs bg-white px-2 py-1 rounded shadow">
            Change Banner
          </button> */}
        </div>

        {/* Profile Content */}
        <div className="p-4 flex flex-col items-center text-center">
          <img
            src="images/ozzy.jpg"
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-12"
          />
          <h2 className="text-xl font-bold mt-2 text-primary">Ekiizu</h2>
          <p className="text-primary">@Ekiizu</p>
          <p className="mt-2 text-sm text-gray-500">
            Meow 
          </p>
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


