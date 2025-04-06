import { React, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const LikeButton = ({info}) => {
    // console.log(info)
    const user = JSON.parse(localStorage.getItem("user")) // logged in user details
    const token = localStorage.getItem("token")

    const [hasLiked, setHasLiked] = useState(null)
    const [likes, setLikes] = useState(0)

    const fetchLikes = async () => {
        try {
            await axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/likes?post_id=${info.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
                .then(res => {
                  // console.log(res.data.data)
                  setLikes(res.data.data)
                })
                .catch(err => console.log(err))

            await axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/likes?post_id=${info.id}&user_id=${user.id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  })
                    .then(res => {
                        // console.log(res.data.data)
                        setHasLiked(res.data.data)
                    })
                    .catch(err => console.log(err))
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
      }

      useEffect(() => {
        fetchLikes();
      }, [])

    const handleLike = async (action) => {
        try {
            if(action == "like") {
                const form = {
                  post_id: info.id,
                  user_id: user.id
                }
                let postLike = await axios.post(`https://viverebackend-main-girysq.laravel.cloud/api/likes`, form, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
                  .then(res => {
                    console.log(res)
                  })
                  .catch(err => console.log(err))
                
                  fetchLikes();
              }
              else if (action == "unlike") {
                // we want to destroy ALL likes from this user if for whatever reason more they have liked more than once
                let deleteLikes = await hasLiked.forEach(j => {
                //   console.log(j.id)
                  axios.delete(`https://viverebackend-main-girysq.laravel.cloud/api/likes/${j.id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  })
                    .then(res => {
                      console.log(res)
                    })
                    .catch(err => console.log(err))

                });

                fetchLikes()

        
      
              }
        } catch (error) {
            console.error("Error handling like:", error)
        }
        
    }

    if (hasLiked != null) {
    return (
        <label id="likeButton" className=" mr-8 swap"  >
        {/* checked="true" to make like button start ON */}
        {hasLiked.length != 0 
        ? <input id="likeButton" type="checkbox" defaultChecked/>
        : <input id="likeButton" type="checkbox" />
        }
        
        
        <div id="likeButton" className="swap-off">
        <svg id="likeButton" onClick={() => handleLike("unlike")}xmlns="http://www.w3.org/2000/svg" className="stroke-primary" viewBox="0 0 24 24" width="48" height="48">
            <path id="likeButton" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke-width="2"/>
        </svg>
        {/* conditional rendering on if likes is defined for like count showing up */}
        {likes != null &&
        <p className="text-primary">{likes.length} likies</p>
        }

        </div>
        <div id="likeButton" onClick={() => handleLike("like")} className="swap-on">
            <svg id="likeButton" xmlns="http://www.w3.org/2000/svg" className="fill-primary stroke-primary" viewBox="0 0 24 24" width="48" height="48">
            <path id="likeButton" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke-width="2"/>
        </svg>
        {likes != null &&
        <p className="text-primary">{likes.length} likies</p>
        }

        </div>
        </label>
    )
}
}

export default LikeButton;