import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function PostModal() {
    // State to store the form data (header, description, image)
    const user = JSON.parse(localStorage.getItem("user")) // logged in user details
    const token = localStorage.getItem("token")

    // const [header, setHeader] = useState("");
    const [userId, setUserId] = useState(user.id)
    // const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [postId, setPostId] = useState(null);

    const [form, setForm] = useState({
        user_id: userId,
        description: ""
    })

    const [imageForm, setImageForm] = useState({
        post_id: "",
        image_link: ""
    })

    // Handle input changes
    // const handleHeaderChange = (e) => setHeader(e.target.value);
    // const handleDescriptionChange = (e) => setDescription(e.target.value);

    // Handle image upload
    const handleImageChange = (e) => setImage(e.target.files[0]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(form)

        const formData = new FormData();
        formData.append("image_link", image);
        
        try {
            const post = await axios.post(`https://viverebackend-main-girysq.laravel.cloud/api/posts`, form, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                .then((res) => {
                                    // console.log(res.data)
                                    formData.append("post_id", res.data.data.id);
                                    // We treat navigating routes like navigating a file system
                                    // We've got to go up one level using '../' to get back to /doctors/{id} from here
                                    // (we're currently at /doctors/create)                
                                    // navigate(`../${res.data.id}`, {relative: 'path'})
                                })
                                .catch((err) => {
                                    console.error(err)
                                })

            console.log(formData.getAll("image_link"));
                                
            const postImage = await axios.post(`https://viverebackend-main-girysq.laravel.cloud/api/images`, formData, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "multipart/form-data"
                                }
                            })
                            .then((res) => {
                                console.log(res.data)
                                // We treat navigating routes like navigating a file system
                                // We've got to go up one level using '../' to get back to /doctors/{id} from here
                                // (we're currently at /doctors/create)                
                                // navigate(`../${res.data.id}`, {relative: 'path'})
                            })
                            .catch((err) => {
                                console.error(err)
                            })
        }
        catch (e) {
            console.error('Something went wrong', e)
        } 
       
        // console.log("Post has been sent to Mars!");
        
        // Close the modal after submission
        document.getElementById("my_modal_3").close();

        // Reset form
        setForm({
            user_id: userId,
            description: ""
        })
    };

    // Handle form change
    const handleChange = (e) => {
        console.log(e.target.name)
        setForm(({
            ...form,
            [e.target.name]: e.target.value
            
        }))
    }

    return (
        <>
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>
                Open Post Modal
            </button> */}

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit}>
                        {/* Close button */}
                        <button 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            type="button"
                            onClick={() => document.getElementById("my_modal_3").close()}
                        >
                            ✕
                        </button>
                    
                        <input
                            type="text"
                            name="description"
                            className="input input-bordered w-full mt-4"
                            placeholder="Share your thoughts!"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />


                        {/* Image upload */}
                        <div className="mt-4">
                            <label className="block">Upload an Image (optional):</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="input input-bordered"
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Submit button */}
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Send into Orbit!</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

