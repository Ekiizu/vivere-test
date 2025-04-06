import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

function Home({ postStyle }) { //added as a prop to toggle the post styles
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) // logged in user details
  const token = localStorage.getItem("token")

  const [posts, setPosts] = useState(null)
  const [postImages, setPostImages] = useState(null)

  const [feedDisplay, setFeedDisplay] = useState(null)

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/posts?page=3`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setPosts(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])


  if(posts != null) {
    if (postStyle === "full") {
    return posts && (

      // this is to confine the post area within the right space
      <div className="ml-48 mt-16 flex-1 p-5"> 
      <div className="flex-1  p-4 rounded">
        {/* for each post return post, j is the current iteration  */}
        {posts.map(({ id, user_id, description }, j) => {
          return (
            <div className="bg-base hover:bg-base-300 md:border-2 rounded border-secondary md:m-5" onClick={(e) => {
              if(e.target.id != "likeButton") {
                navigate(`/posts/${id}`, {replace: false})
              }
            }}>
              
              <Post postInfo={posts[j]}/>
            </div>
          );         
        })}
      </div>
      </div>
    );
  }
  else if (postStyle === "masonry") {

  
    return (
      <div className="ml-48 mt-16 flex-1 p-5">
        <div className="masonry-grid">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="masonry-item relative group overflow-hidden rounded-lg"
              onClick={() => {
                navigate(`/posts/${post.id}`, { replace: false });
              }}
            >
              <Post postInfo={post} />
            </div>
          ))}
        </div>
      </div>
    );
  }
} else {
      <div class="loader"></div> 
    }
    
  }


export default Home;

