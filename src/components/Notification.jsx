import { useState } from "react";

const Notification = () => {
  const [show, setShow] = useState(false);
  const notifications = ["New like on your post!", "New follower!"];

  return (
    <div>
      <button onClick={() => setShow(!show)} className="btn btn-secondary">
        🔔
      </button>
      {show && (
        <div className="absolute bg-white shadow-lg p-4 right-10 top-12 w-64">
          {notifications.map((note, i) => (
            <p key={i} className="p-2 border-b">{note}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
