import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const LikePoke = () => {
  const [Like, setLike] = useState(false);

  const toogleLike = () => {
    setLike((check) => !check);
  };
  return (
    <>
      <button onClick={toogleLike}>
        {Like ? (
          <FaHeart color="red" size={20} />
        ) : (
          <FaRegHeart color="white" size={20} />
        )}
      </button>
    </>
  );
};

export default LikePoke;
