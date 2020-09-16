import React, { useState } from "react";
import { firebaseStorage, firestoreDb } from "firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObject }) => {
  const [nweet, setNweet] = useState("");
  const [fileString, setFileString] = useState(null);

  const onSubmit = async (event) => {
    if (nweet === "") {
      return;
    }
    event.preventDefault();
    let imgUrl = null;
    if (fileString !== null) {
      const fileRef = firebaseStorage
        .ref()
        .child(`${userObject.uid}/${uuidv4()}`);

      const response = await fileRef.putString(fileString, "data_url");
      imgUrl = await response.ref.getDownloadURL();
      setFileString(null);
    }

    setNweet("");

    const newNweet = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      imgUrl,
    };
    await firestoreDb.collection("nweets").add(newNweet);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const photoFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileString(result);
    };
    reader.readAsDataURL(photoFile);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onClearFileString = () => setFileString(null);

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      <input type="submit" value="Nweet It" />
      {fileString && (
        <div className="factoryForm__attachment">
          <img
            src={fileString}
            style={{
              backgroundImage: fileString,
            }}
            alt=""
          />
          <div className="factoryForm__clear" onClick={onClearFileString}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
