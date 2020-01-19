import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql/"
});

const Application = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Application />, document.getElementById("root"));
registerServiceWorker();
