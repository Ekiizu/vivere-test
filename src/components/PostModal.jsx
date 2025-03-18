import React, { useState } from "react";
import "../App.css";

export default function PostModal() {
    // State to store the form data (header, body, image)
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);

    // Handle input changes
    const handleHeaderChange = (e) => setHeader(e.target.value);
    const handleBodyChange = (e) => setBody(e.target.value);

    // Handle image upload
    const handleImageChange = (e) => setImage(e.target.files[0]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Log the post data (BACKEND)
        console.log({
            header,
            body,
            image,
        });

       
        console.log("Post has been sent to Mars!");

        // Reset the form
        setHeader("");
        setBody("");
        setImage(null);

        // Close the modal after submission
        document.getElementById("my_modal_3").close();
    };

    return (
        <>
            <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>
                Open Post Modal
            </button>

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

                        {/* Header input */}
                        <h3 className="font-bold text-lg">Create a Post! ✮⋆˙</h3>
                        <input
                            type="text"
                            className="input input-bordered w-full mt-4"
                            placeholder="Title"
                            value={header}
                            onChange={handleHeaderChange}
                            required
                        />
                        
                        {/* Body input */}
                        <textarea
                            className="textarea textarea-bordered w-full mt-4"
                            placeholder=""
                            value={body}
                            onChange={handleBodyChange}
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

