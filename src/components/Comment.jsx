import { React, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

// This is just the text and info for the posts. Images will be added in the home page. To avoid unnecessary API calls
const Comment = (commentInfo) => {
    const info = commentInfo.commentInfo;
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
        <div className="flex">
            <div className="pr-3">
                <img loading="lazy" src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${info.user_id}&radius=25&backgroundColor=b6e3f4,ffd5dc,c0aede,ffffff,d1d4f9,ffdfbf&backgroundType=gradientLinear&frecklesProbability=25`} width="64" height="64"/> 
            </div>
            <div>
                <h2 className="card-title">{poster.username}</h2>
                <p>{info.body}</p>
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

export default Comment;