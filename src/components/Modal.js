import React from "react";
import "./Modal.css"; // Ensure Modal.css is imported

const Modal = ({ children }) => {
  return <div className="modal-overlay">{children}</div>;
};

export default Modal;
