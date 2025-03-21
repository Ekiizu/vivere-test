import React from "react";
import { useState } from "react";
import "../App.css";

const Post = (postInfo) => {

    const info = postInfo.postInfo;

    return (
        <div className="">
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" /> 
        </figure>
        <div className="card-body">
            <h2 className="card-title">{info.user_id}</h2>
            <p>{info.description}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
        </div>
    )
}

export default Post;