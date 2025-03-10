import React, { useEffect } from "react";
import "../App.css";

export default function NotifModal({ isOpen, toggleModal }) {
  useEffect(() => {
    console.log("Modal isOpen:", isOpen); 
  }, [isOpen]);

  if (!isOpen) return null; 

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
{/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  );
}
