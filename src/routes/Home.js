import { firestoreDb } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObject }) => {
  const [nweetsCollection, setNweetsCollection] = useState([]);

  useEffect(() => {
    firestoreDb
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNweetsCollection(nweetsArray);
      });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObject={userObject} />
      <div style={{ marginTop: 30 }}>
        {nweetsCollection.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObject={nweet}
            isOwner={nweet.creatorId === userObject.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
