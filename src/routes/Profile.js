import Nweet from "components/Nweet";
import { authService, firestoreDb } from "firebaseConfig";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObject, refreshUser }) => {
  const [myNweets, setMyNweets] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);

  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const myNweetsFromFirestore = await firestoreDb
      .collection("nweets")
      .where("creatorId", "==", userObject.uid)
      .orderBy("createdAt", "desc")
      .get();

    const myNweetsArray = myNweetsFromFirestore.docs.map((doc) => {
      return doc.data();
    });

    setMyNweets(myNweetsArray);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObject.displayName !== newDisplayName) {
      await userObject.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  const onDisplayNameChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          autoFocus
          className="formInput"
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onDisplayNameChange}
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      {myNweets &&
        myNweets.map((nweet) => {
          return (
            <Nweet
              key={`${nweet.createdAt}`}
              nweetObject={nweet}
              isOwner={userObject.uid === nweet.creatorId}
            />
          );
        })}
    </div>
  );
};

export default Profile;
