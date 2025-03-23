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
                console.log(response.data)
                setPoster(response.data.data)
            })
            .catch(err => console.log(err))
    }, []);
    

    if (poster != null) {
    return (
        <div className="bg-base hover:bg-base-300 rounded">
        <div className="flex p-5 ">
            <div className="pr-3">
                <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=%7B${info.user_id}%7D&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`} width="64" height="64"/> 
            </div>
            <div>
                <h2 className="card-title">{poster.username}</h2>
                <p>{info.description}</p>
            </div>
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