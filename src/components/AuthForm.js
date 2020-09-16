import React, { useState } from "react";
import { authService } from "firebaseConfig";

const AuthForm = () => {
  const [error, setError] = useState("");
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const handleInputChange = (event) => {
    setLoginInput({
      ...loginInput,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    console.log(loginInput);
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        // create new account
        data = await authService.createUserWithEmailAndPassword(
          loginInput.email,
          loginInput.password
        );
      } else {
        // Log in
        data = await authService.signInWithEmailAndPassword(
          loginInput.email,
          loginInput.password
        );
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={loginInput.email}
          onChange={handleInputChange}
          required
          className="authInput"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginInput.password}
          onChange={handleInputChange}
          required
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <button onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </button>
    </>
  );
};

export default AuthForm;
