import React from "react";
import "./imageModal.css";
export const Modal = ({ handleClose, show, children }) => {
  let showHideClassName = show ? "display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Card Title</span>
              {children}
              <p>
                I am a very simple card. I am good at containing small bits of
                information. I am convenient because I require little markup to
                use effectively.
              </p>
            </div>
            <div class="card-action">
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
