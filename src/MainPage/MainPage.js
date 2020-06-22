import React, { Component } from "react";
import Timeline from "../Timeline/timeline.js";
import Sidebar from "../Sidebar/sidebar.js";

export default function MainPage(client) {
  console.log("First client: ", client);
  console.log("First query: ", client.query);
  return (
    <div className="row App">
      <Timeline client={client} />
      <Sidebar client={client} />
    </div>
  );
}
