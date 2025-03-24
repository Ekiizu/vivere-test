import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) // logged in user details
  const [posts, setPosts] = useState(null)
  const [postImages, setPostImages] = useState(null)

  const [feedDisplay, setFeedDisplay] = useState(null)

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    axios.get(`https://viverebackend-main-girysq.laravel.cloud/api/posts`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => {
        setPosts(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

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

  const images = [
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzy.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
    "images/ozzybed.jpg",
    "images/ozzycute.jpg",
    "images/ozzybaby.jpg",
    "images/ozbox.jpg",
  ];

  // return (
  //   <div>
  //     {/* Main Content Area */}
  //     <div className="ml-48 mt-16 flex-1 p-5">
  //       {/* Masonry Image Layout with Smaller Images */}
  //       <Card />
  //       <Post />
  //       {/* <button className="btn" onClick={toggleModal}>Open Notification Modal</button> */} 
  //       {/* testing */}
  //     </div>
  //     <NotifModal isOpen={isModalOpen} toggleModal={toggleModal} />
  //   </div>
  // );

  if(posts != null && postImages != null) {
    return posts && (

      // this is to confine the post area within the right space
      <div className="ml-48 mt-16 flex-1 p-5"> 
      <div className="flex-1 border-2 border-primary p-4 rounded">
        {/* for each post return post, j is the current iteration  */}
        {posts.map(({ id, user_id, description }, j) => {
          return (
            <div className="bg-base hover:bg-base-300 border-2 rounded border-secondary m-5" onClick={() => {
              navigate(`/posts/${id}`, {replace: false})
            }}>
              <div className="mx-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center" >
              {postImages.map(({id, image_link, post_id}, k) => {
                console.log(postImages[k])
                if(postImages[k].post_id == posts[j].id) {
                  return(
                    <img loading="lazy" src={postImages[k].image_link} className="m-2 w-full h-[400px] rounded object-cover col-span-1"/>
                  )
                }
              })}
              </div>
              <Post postInfo={posts[j]}/>
            </div>
          )          
        })}
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

export default Home;

