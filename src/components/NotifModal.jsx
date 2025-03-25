import React, { useState } from "react";
import "../App.css";

export default function NotifModal() {
    // State to store the number of likes and followers
    const [likes, setLikes] = useState(0);
    const [followers, setFollowers] = useState(0);

    // Track the currently selected tab
    const [selectedTab, setSelectedTab] = useState('likes');


    const handleModal = () => {
        document.getElementById('my_modal_1').showModal();
        console.log("Notif modal opened");
    };

    return (
        <>
{/*            
            <button className="btn" onClick={handleModal}>
                Open Notif Modal
            </button> */}

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <form method="dialog modal-backdrop">
                        {/* Close button */}
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            type="button"
                            onClick={() => document.getElementById("my_modal_1").close()}
                        >
                            ✕
                        </button>
                    </form>

                    <h3 className="font-bold text-lg">Notifications</h3>
                    <h4 className="font-bold">You've received a notification from mars! ⋆｡°✩</h4>

                    {/* Tabs for Likes and Followers */}
                    <div className="tabs mt-4">
                        <a
                            className={`tab tab-bordered ${selectedTab === 'likes' ? 'tab-active' : ''}`}
                            onClick={() => setSelectedTab('likes')}
                        >
                            Likes
                        </a>
                        <a
                            className={`tab tab-bordered ${selectedTab === 'followers' ? 'tab-active' : ''}`}
                            onClick={() => setSelectedTab('followers')}
                        >
                            Followers
                        </a>
                    </div>

                    {/* Tab Content */}
                    <div className="py-4">
                        {selectedTab === 'likes' ? (
                            <p><strong>{likes}</strong> new like(s) received!</p>
                        ) : (
                            <p><strong>{followers}</strong> new follower(s) received!</p>
                        )}
                    </div>

           
                </div>
            </dialog>
        </>
    );
}


