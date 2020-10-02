import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "firebaseConfig";
import { NextSeo } from "next-seo";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      <NextSeo
        title="Not Another Twitter Clone"
        description="A gurantee you that this isn't a twitter clone"
      />
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          userObject={userObject}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        ""
      )}
      {/* <footer style={{ textAlign: "center" }}>
        &copy; Not Twitter {new Date().getFullYear()}
      </footer> */}
    </>
  );
}

export default App;
