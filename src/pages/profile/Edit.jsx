import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 

  
  const [form, setForm] = useState({
    username: user.username || "",
    password: user.password || "",
    bio: user.bio || "",
    colour1: user.colour1 || "#ffffff",
    colour2: user.colour2 || "#ffffff",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to update the user profile in the database
      const response = await axios.patch(
        `https:/viverebackend-main-girysq.laravel.cloud/api/users/${user.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);

      
    //   localStorage.setItem("user", JSON.stringify(response.data));

      // Navigate back to the profile page
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="input input-bordered w-full"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Bio Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            className="textarea textarea-bordered w-full"
            value={form.bio}
            onChange={handleChange}
            required
          />
        </div>

        {/* Primary Color Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Primary Color</label>
          <input
            type="color"
            name="colour1"
            className="input input-bordered w-full"
            value={form.colour1}
            onChange={handleChange}
          />
        </div>

        {/* Secondary Color Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Secondary Color</label>
          <input
            type="color"
            name="colour2"
            className="input input-bordered w-full"
            value={form.colour2}
            onChange={handleChange}
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="btn btn-accent"
            onClick={() => navigate("/profile")} 
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
