import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import { useNavigate, useParams } from "react-router-dom";

function ViewPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {id} = useParams();

  const user = JSON.parse(localStorage.getItem("user")) // logged in user details
  const [post, setPost] = useState(null)
  const [postImages, setPostImages] = useState(null)
  const [comments, setComments] = useState(null)

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

//   get post by id
  useEffect(() => {
    axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => {
        setPost(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

//   get images
  useEffect(() => {
    axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/images`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => {
        setPostImages(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

//   get comments
  useEffect(() => {
    axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/comments`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => {
        setComments(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])


  

  if(post != null && postImages != null) {
    return post && (

      // this is to confine the post area within the right space
      <div className="ml-48 mt-16 flex-1 p-5"> 
      <div className="flex-1 border-2 border-primary p-4 rounded">
            <div className="bg-base hover:bg-base-300 border-2 rounded border-secondary m-5">
              <div className="mx-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
              {postImages.map(({id, image_link, post_id}, k) => {
                if(postImages[k].post_id == post.id) {
                  return(
                    <img src={postImages[k].image_link} className="m-2 w-full h-[400px] rounded object-cover col-span-1"/>
                  )
                }
              })}
              </div>
              <Post postInfo={post}/>

              
            </div>

            {comments != null && 
            comments.map(({id, body, user_id, post_id}, j) => {
                if(comments[j].post_id == post.id) {
                    return(
                        <Comment commentInfo={comments[j]} />
                    )
                }

            })
        }

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

export default ViewPost;

