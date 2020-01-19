import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router";
import { gql } from "apollo-boost";

const SIGNUP = gql`
  mutation Signup($password: String!, $email: String!) {
    addUser(password: $password, email: $email) {
      password
    }
  }
`;

export default function Signup() {
  const [isLoggedIn] = useState(false);
  const [redirect, redirectPage] = useState(false);
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [signup, { data }] = useMutation(SIGNUP);

  if (redirect) {
    return <Redirect to="/login" />;
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
          signup({
            variables: { password: password, email: email }
          })
        }
        value="Submit"
      />
    </form>
  );
}
