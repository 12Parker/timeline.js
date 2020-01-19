import React, { useState } from "react";
import { Redirect } from "react-router";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LOGIN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      password
    }
  }
`;

export default function Login() {
  const [isLoggedIn] = useState(false);
  const [redirect, redirectPage] = useState(false);
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [login, { data }] = useMutation(LOGIN);
  console.log("Dat: ", data);

  if (redirect) {
    console.log("rd");
    return <Redirect isLoggedIn={isLoggedIn} to="/" />;
  }
  return (
    <form>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={email}
          onChange={e => updateEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => updatePassword(e.target.value)}
        />
      </label>
      <input
        type="button"
        onClick={() =>
          login({
            variables: { password: password, email: email }
          })
        }
        value="Submit"
      />
    </form>
  );
}
