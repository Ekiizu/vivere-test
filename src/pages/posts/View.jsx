import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import Reply from "../../components/Reply";
import { useNavigate, useParams } from "react-router-dom";

function ViewPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {id} = useParams();

  const user = JSON.parse(localStorage.getItem("user")) // logged in user details
  const token = localStorage.getItem("token")

  const [post, setPost] = useState(null)
  const [postImages, setPostImages] = useState(null)
  const [comments, setComments] = useState(null)
  const [replies, setReplies] = useState (null)

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

//   get post by id
  useEffect(() => {
    axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setPost(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

//   get images
  // useEffect(() => {
  //   axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/images`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then(res => {
  //       setPostImages(res.data.data)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

//   get comments
//   async function fetchPostComments() {


    
//     let postRes = await axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/posts/${id}`, {
//       headers: {
//         Authorization: `Bearer ${user.token}`
//       }
//     })

//     let commentRes = await axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/comments`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`
//         }
//     })
//     .then(res => {
//         commentRes.data.data.filter((comment) => (comment.post_id == postRes.data.data.id))
//         setComments(res.data.data)
//       })
//       .catch(err => console.log(err))
//     }
    

  useEffect(() => {
    axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/comments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res.data.data)
        setComments(res.data.data.filter((comment) => (comment.post_id == id)))
        return axios.get (`https://viverebackend-main-girysq.laravel.cloud/api/replies`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
      })
      .then(repRes => {
        console.log(repRes.data.data)
        setReplies(repRes.data.data)
      }

      )
      .catch(err => console.log(err))
  }, [])


  

  if(post != null ) {
    return post && (

      // this is to confine the post area within the right space
      <div className="ml-48 mt-16 flex-1 p-5"> 
      <div className="flex-1 border-2 border-primary p-4 rounded">
            <div className=" border-2 rounded border-secondary m-5">
              {/* <div className="mx-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
              {postImages.map(({id, image_link, post_id}, k) => {
                if(postImages[k].post_id == post.id) {
                  return(
                    <img src={postImages[k].image_link} className="mt-4 w-full h-[400px] rounded object-cover col-span-1"/>
                  )
                }
              })}
              </div> */}
              <Post postInfo={post}/>
              
              
            </div>

            {comments != null && <h1 className="text-xl font-bold mx-8 text-primary">{comments.length} comments</h1>}


            {comments != null && 
            comments.map(({id, body, user_id, post_id}, j) => {
                if(comments[j].post_id == post.id) {
                    return(
                        <div className="m-5 px-8 py-4 border-2">
                        <Comment commentInfo={comments[j]} />
                        {replies != null &&
                        replies.map(({id, user_id, body, comment_id}, i) => {
                            if(replies[i].comment_id == comments[j].id) {
                                console.log(replies[i])

                                return (
                                    <div className="ml-16 py-2 ">
                                    <Reply replyInfo={replies[i]} />
                                    </div>
                                )
                            }
                        })}
                        </div>
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

