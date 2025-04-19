import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import Reply from "../../components/Reply";
import { useNavigate, useParams } from "react-router-dom";
import ShareButton from "../../components/Buttons/ShareButton";

function ViewPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {id} = useParams();

  const user = JSON.parse(localStorage.getItem("user")) // logged in user details
  const token = localStorage.getItem("token")

  const [post, setPost] = useState(null)
  const [postImages, setPostImages] = useState(null)
  const [comment, setComment] = useState()
  const [comments, setComments] = useState([])
  const [replies, setReplies] = useState ([])

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

//   get post by id
  useEffect(() => {
    axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/posts-comments-replies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setPost(res.data.data)
        setComments(res.data.data.comments)
      })
      .catch(err => console.log(err))
  }, [])
    
  // const fetchComments = async () => {
  //   try {
  //     const commentFetch = await axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/comments?post_id=${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //       .then(res => {
  //         console.log(res.data.data)
  //         setComments(res.data.data)
  //     })
  //         .catch(err => console.log("Error fetching comments:", err))
          
  //     }

  //   catch (error) {
  //     console.error("Error fetching comments and replies:", error)
  //   }
  // }

  // useEffect(() => {
  //   fetchComments()
  // }, [])

  // // holy react moment | This only runs when comments is updated
  // useEffect(() => {
  //   const replyFetch = async () => {
  //     for (let _c of comments) {
  //     // console.log(_c)
  //     try {
  //       let res = await axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/replies?comment_id=${_c.id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //         .then(res => {
  //           // console.log(res.data.data)
  //           setReplies(prevReplies => [...prevReplies, ...res.data.data])
  //       })
  //     }
  //     catch (error) {
  //       console.log("Error fetching replies", error)
  //     }
  //     }
  //   }

  // if (comments != null && comments.length > 0) {
  //   replyFetch()
  // }

  // }, [comments])

  
  const handleDelete = async (postId) => {
    axios.delete(`https://viverebackend-main-girysq.laravel.cloud/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res)

    }).catch((err) => {
      console.error(err)
    })
  }

  const handleComment = async (e) => {
    setComment(e.target.value)
  }

  const submitComment = async () => {
    const form = {
      post_id: id,
      user_id: user.id,
      body: comment
    }
    
    axios.post(`https://viverebackend-main-girysq.laravel.cloud/api/comments`, form, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
        console.log(res);
        setComments((comments) => [...comments, comment])
        setComment("")
    })
    .catch((err) => {
        console.error(err)
    })
  }

  if(post != null ) {
    return post && (
      // this is to confine the post area within the right space
      <div className="ml-48 mt-16 flex-1 p-5"> 
      <div className="flex-1 border-2 border-primary p-4 rounded">
            <div className="border-secondary m-5">
            
              <div className="flex justify-end dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn bg-base-300 m-1">
              <svg className="fill-primary stroke-primary" viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / More_Horizontal"> <g id="Vector"> <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke="#none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke="#none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><ShareButton /></li>
                {user.id == post.user_id && 
                <>
                <li><button onClick={() => {
                    const confirmDelete = window.confirm("are you sure?")

                    if (confirmDelete) {
                        handleDelete(id)
                    }
                }}>
                  <svg className="stroke-primary" viewBox="0 0 24 24" height="32" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_Line_01"> <path id="Vector" d="M4 20.0001H20M4 20.0001V16.0001L12 8.00012M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg> Edit
                </button></li>
                <li><button onClick={() => {
                    const confirmDelete = window.confirm("are you sure?")

                    if (confirmDelete) {
                        handleDelete(id)
                    }
                }}>
                  <svg className="fill-primary stroke-primary" fill="none" height="32" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_6_"> <g id="XMLID_11_"> <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z"></path> </g> <g id="XMLID_18_"> <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z"></path> </g> <g id="XMLID_23_"> <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"></path> </g> </g> </g></svg> Delete
                </button></li>
                </>
                }
              </ul>
              </div>
              <Post postInfo={post}/>
              
              {/* comment input */}
              <div className="join px-8 pt-4 w-full">
              <label className="input join-item w-full pr-0">
              <svg className="fill-primary" width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>comment 3</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-207.000000, -257.000000)"> <path d="M231,273 C229.896,273 229,272.104 229,271 C229,269.896 229.896,269 231,269 C232.104,269 233,269.896 233,271 C233,272.104 232.104,273 231,273 L231,273 Z M223,273 C221.896,273 221,272.104 221,271 C221,269.896 221.896,269 223,269 C224.104,269 225,269.896 225,271 C225,272.104 224.104,273 223,273 L223,273 Z M215,273 C213.896,273 213,272.104 213,271 C213,269.896 213.896,269 215,269 C216.104,269 217,269.896 217,271 C217,272.104 216.104,273 215,273 L215,273 Z M223,257 C214.164,257 207,263.269 207,271 C207,275.419 209.345,279.354 213,281.919 L213,289 L220.009,284.747 C220.979,284.907 221.977,285 223,285 C231.836,285 239,278.732 239,271 C239,263.269 231.836,257 223,257 L223,257 Z" id="comment-3" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                <input type="text" placeholder="Add a comment..." className="" autoComplete="off" value={comment} onChange={handleComment}/>
                </label>
                <button className="btn btn-neutral join-item" onClick={submitComment}>Post</button>

              </div>

              
            </div>

            {post.comments != null && <h1 className="text-xl font-bold mx-8 text-primary">{post.comments.length} comments</h1>}

            {comments != null && post != null &&
            comments.map(({id, body, user_id, post_id}, j) => {
                if(comments[j].post_id == post.id) {
                    return(
                        <div className="m-5 px-8 py-4 border-2">
                        <Comment commentInfo={comments[j]} />
                        {comments[j].replies != null &&
                        comments[j].replies.map(({id, user_id, body, comment_id}, i) => {
                            if(comments[j].replies[i].comment_id == comments[j].id) {
                                console.log(comments[j].replies[i])
                                return (
                                    <div className="ml-16 py-2 ">
                                    <Reply replyInfo={comments[j].replies[i]} />
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
      <div class=""></div>
    )
  }
}

export default ViewPost;

