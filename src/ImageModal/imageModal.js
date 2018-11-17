import React from "react";
import "./imageModal.css";
import MomentComment from "../MomentComment/momentComment";
export const Modal = ({ handleClose, show, children }) => {
  let showHideClassName = show ? "display-block" : "display-none";
  return (
    <div
      style={{ wordBreak: "break-word", maxWidth: "300px" }}
      className={showHideClassName}
    >
      <div className="col">
        <div className="card blue-grey darken-1">
          <div className="card-image">
            <button className="cancelBtn right" onClick={handleClose}>
              X
            </button>
            <img
              style={{ width: "100%", height: "200px" }}
              src={require("../Images/smile.png")}
            />
            <span className="card-title">Card Title</span>
          </div>
          <div className="card-content white-text">
            {children}
            <MomentComment
              momentComment={{ comment: "Please add a comment." }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
