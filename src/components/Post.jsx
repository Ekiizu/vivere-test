import { React, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

// This is just the text and info for the posts. Images will be added in the home page. To avoid unnecessary API calls
const Post = (postInfo) => {
    const info = postInfo.postInfo;
    const user = JSON.parse(localStorage.getItem("user")) // logged in user details
    
    const [poster, setPoster] = useState()
    useEffect(() => {
        axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/users/${info.user_id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(response => {
                // console.log(response.data)
                setPoster(response.data.data)
            })
            .catch(err => console.log(err))
    }, []);
    

    if (poster != null) {
    return (
        <div className="">
        <div className="flex p-8 ">
            <div className="pr-3">
                <img loading="lazy" src={`https://api.dicebear.com/9.x/adventurer/svg?seed=%7B${info.user_id}%7D&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`} width="64" height="64"/> 
            </div>
            <div>
                <h2 className="card-title">{poster.username}</h2>
                <p>{info.description}</p>
            </div>
            
        </div>
            {/* buttons for like, comment, etc. */}
            <div class="flex justify-end">
            <button class="btn mb-4 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
            </button>
            </div>
        </div>
    )
    }
    else {
        return (
          <div class="loader"></div>
        )
    }
}

export default Post;