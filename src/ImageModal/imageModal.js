import React from "react";
import "./imageModal.css";
import MomentComment from "../MomentComment/momentComment";
export const Modal = ({
  counter,
  updateMoment,
  index,
  title,
  handleClose,
  show,
  children
}) => {
  console.log("Updating modal");
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
              src={require("../DefaultImages/wallpapersden.com_space-moon-and-earth-minimalism-art_3840x2160.jpg")}
            />
            <span className="card-title">{title}</span>
          </div>
          <div className="card-content white-text">
            {children}
            <MomentComment
              key={index}
              counter={counter}
              updateMoment={updateMoment}
              index={index}
              placeholder={{ comment: "Please add a comment." }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
