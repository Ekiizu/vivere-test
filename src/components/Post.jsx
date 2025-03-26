import { React, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

// This is just the text and info for the posts. Images will be added in the home page. To avoid unnecessary API calls
const Post = (postInfo) => {
    const info = postInfo.postInfo;
    const user = JSON.parse(localStorage.getItem("user")) // logged in user details
    
    const [poster, setPoster] = useState()
    const [postImages, setPostImages] = useState(null)

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

    useEffect(() => {
        axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/images?post_id=${info.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
          .then(res => {
            console.log(res)
            setPostImages(res.data.data)
          })
          .catch(err => console.log(err))
      }, [])
    
    // console.log(images)
    if (poster != null && postImages != null) {
    return (
        <div className="">
        <div className="mx-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center" >
              {postImages.map(({id, image_link, post_id}, k) => {
                if(postImages[k].post_id == info.id) {
                  return(
                    <img loading="lazy" src={postImages[k].image_link} className="m-2 w-full h-[400px] rounded object-cover col-span-1"/>
                  )
                }
              })}
        </div>
        <div className="flex p-8 ">
            <div className="pr-3">
                <img loading="lazy" src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${info.user_id}&radius=25&backgroundColor=b6e3f4,ffd5dc,c0aede,ffffff,d1d4f9,ffdfbf&backgroundType=gradientLinear&frecklesProbability=25`} width="64" height="64"/> 
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

//need to add if statment so that depending on if you are toggled onto a full or masonry layout different information will shwo up  26TH MARCH