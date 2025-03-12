import React, { useEffect } from "react";
import "../App.css";

export default function NotifModal({ isOpen, toggleModal }) {
  useEffect(() => {
    console.log("Modal isOpen:", isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <dialog id="my_modal_1" className="modal" open>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Notifications</h3>
          <p className="py-3">heyyyy :3</p>
          <div className="modal-action">
            <button className="btn" onClick={toggleModal}>Close</button>
            test
          </div>
        </div>
      </dialog>
    </div>
  );
}

