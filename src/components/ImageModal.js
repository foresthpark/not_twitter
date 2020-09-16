import React from "react";
import { motion } from "framer-motion";

const ImageModal = ({ selectedImage, setSelectedImage }) => {
  const handleClick = (event) => {
    if (event.target.classList.contains("backdrop_black")) {
      setSelectedImage(null);
    }
  };

  return (
    <React.Fragment>
      <motion.div
        className="backdrop_black"
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          // className="backdrop_img"
          src={selectedImage}
          alt="still not the droids you're looking for"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
        />
      </motion.div>
    </React.Fragment>
  );
};

export default ImageModal;
