import { authService, firebaseInstance } from "firebaseConfig";
import React from "react";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const onGithubClick = async () => {
    await authService.signInWithPopup(
      new firebaseInstance.auth.GithubAuthProvider()
    );
  };

  const onGoogleClick = async () => {
    await authService.signInWithPopup(
      new firebaseInstance.auth.GoogleAuthProvider()
    );
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />

      <div className="authBtns">
        <button onClick={onGoogleClick} name="google" className="authBtn">
          Log in with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onGithubClick} name="github" className="authBtn">
          Log in with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
