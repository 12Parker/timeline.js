import React, { Component } from "react";
import Timeline from "../Timeline/timeline.js";
import Sidebar from "../Sidebar/sidebar.js";

export default function MainPage() {
  return (
    <div className="row App">
      <Timeline />
      <Sidebar />
    </div>
  );
}
