import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LikeButton from "./Buttons/LikeButton";
import "../App.css";

// This is just the text and info for the posts. Images will be added in the home page. To avoid unnecessary API calls
const Post = ({ postInfo , postStyle }) => {
    const info = postInfo || {} ; //THIS WAS THE ISSUE
    const user = JSON.parse(localStorage.getItem("user")) // logged in user details
    const token = localStorage.getItem("token")

    const [hasLiked, setHasLiked] = useState(null)
    const [likes, setLikes] = useState(null)
    const [poster, setPoster] = useState()
    const [postImages, setPostImages] = useState(null)

    const [likeCount, setLikeCount] = useState()

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

      
    useEffect(() => {
      axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/likes?post_id=${info.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          // console.log(res.data.data)
          setLikes(res.data.data)
          if (res.data.data){
          setLikeCount(res.data.data.length);}
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/likes?post_id=${info.id}&user_id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          // console.log(res.data.data)
          setHasLiked(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])
      
    const handleLike = (action) => {
      if(action == "like") {
        const form = {
          post_id: info.id,
          user_id: user.id
        }
        axios.post(`https://viverebackend-main-girysq.laravel.cloud/api/likes`, form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err))
        
          // setLikeCount(likeCount += 1)
      }
      else if (action == "unlike") {
        // we want to destroy ALL likes from this user if for whatever reason more they have liked more than once
        hasLiked.forEach(j => {
          console.log(j.id)
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

        // setLikeCount(likeCount -= 1)
      }
    };


      // Render only images for masonry layout
    if (postStyle === "masonry" && postImages != null) {
      return (
        
        <div className="masonry-item">
          
          {postImages.map(({ id, image_link }) => (
            <img
              key={id}
              src={image_link}
              alt="Post"
              className="object-cover w-full rounded-lg transform transition duration-300 ease-in-out group-hover:scale-105"

              
            />
          ))}
        </div>
        
      );
    }


    // console.log(images)
    if ( postStyle === "full" && poster != null && postImages != null && hasLiked != null) {
    return (
        <div id="post" className="">
        <div className="mx-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center" >
              {postImages.map(({id, image_link, post_id}, k) => {
                if(postImages[k].post_id == info.id) {
                  return(
                    <img loading="lazy" src={`${postImages[k].image_link}`} className="m-2 w-full h-[400px] rounded object-cover col-span-1"/>
                  )
                }
              })}
        </div>
        <div className="flex p-8 ">
            <div className="pr-3">
                <img loading="lazy" src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${info.user_id}&radius=25&backgroundColor=b6e3f4,ffd5dc,c0aede,ffffff,d1d4f9,ffdfbf&backgroundType=gradientLinear&frecklesProbability=25`} width="64" height="64"/> 
            </div>
            <div>
                <Link to={`/profile/${poster.id}`} className="card-title text-primary-500 hover:underline">
                  {poster.username}
                </Link>
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
          <LikeButton info={info} />
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

