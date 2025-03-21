import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Card from "../components/Card";
import Post from "../components/Post";
import NotifModal from "../components/NotifModal";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) // logged in user details
  const [posts, setPosts] = useState(null)

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

  if(posts != null) {
    return posts && (

      // this is to confine the post area within the right space
      <div className="ml-48 mt-16 flex-1 p-5"> 
      <div className="flex-1 border-2 border-primary p-4 rounded">
        {/* for each post return post, j is the current iteration  */}
        {posts.map(({ id, user_id, description }, j) => {
          return (
            <Post postInfo={posts[j]}/>
          )          
        })}
      </div>
      </div>
    )
  }
}

export default Home;

