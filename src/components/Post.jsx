import { React, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

// This is just the text and info for the posts. Images will be added in the home page. To avoid unnecessary API calls
const Post = (postInfo) => {
    const info = postInfo.postInfo;
    const user = JSON.parse(localStorage.getItem("user")) // logged in user details
    const token = localStorage.getItem("token")

    const [poster, setPoster] = useState()
    const [postImages, setPostImages] = useState(null)

    useEffect(() => {
        axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/users/${info.user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
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
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => {
            // console.log(res)
            setPostImages(res.data.data)
          })
          .catch(err => console.log(err))
      }, [])
    
    // console.log(images)
    if (poster != null && postImages != null) {
    return (
        <div id="post" className="">
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
            {/* <div id="likeButton" class="flex justify-end">
            <button id="likeButton" class="btn mb-4 mr-4">
              <label id="likeButton" className="swap">
              <input id="likeButton" type="checkbox" className="btn mb-4 mr-4"/>
              <div id="likeButton" className="swap-on">ON</div>
              <div id="likeButton" className="swap-off">OFF</div>
            </label>            
            </button>
            </div> */}

            

          <div className="flex justify-end p-4">
          <label id="likeButton" className=" mr-8 swap">
            <input id="likeButton" type="checkbox" className=""/>
            
            
            <div id="likeButton" className="swap-on">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-primary" viewBox="0 0 48 48" width="48" height="48">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke-width="2"/>
            </svg>

            </div>
            <div id="likeButton" className="swap-off">
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary stroke-primary" viewBox="0 0 48 48" width="48" height="48">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke-width="2"/>
            </svg>
            </div>
          </label>
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