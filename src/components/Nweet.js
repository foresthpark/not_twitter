import { firebaseStorage, firestoreDb } from "firebaseConfig";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObject, isOwner }) => {
  const [newNweet, setNewNweet] = useState(nweetObject.text);
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => setIsEditing((prev) => !prev);

  const handleDeleteClick = async () => {
    const confirmClick = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (confirmClick) {
      await firestoreDb.doc(`nweets/${nweetObject.id}`).delete();
      await firebaseStorage.refFromURL(nweetObject.imgUrl).delete();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewNweet(value);
  };

  const submitNewNweet = async (event) => {
    event.preventDefault();
    console.log(nweetObject, newNweet);
    await firestoreDb.doc(`nweets/${nweetObject.id}`).update({
      text: newNweet,
    });

    setIsEditing(false);
  };

  return (
    <div className="nweet">
      {isEditing ? (
        <>
          <form onSubmit={submitNewNweet} className="container nweetEdit">
            <input
              autoFocus
              type="text"
              className="formInput"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update" className="formBtn" />
          </form>
          <button onClick={toggleIsEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{nweetObject.text}</h4>
          {nweetObject.imgUrl && <img src={nweetObject.imgUrl} alt="" />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleIsEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
