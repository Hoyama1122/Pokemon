import React from "react";
import PropTypes from "prop-types";
import LikePoke from "./LikePoke";

const Fav = ({ FavoritePokems, catipalizeFirstLetter }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-3/12 bg-gray-900 bg-opacity-90 p-4 overflow-y-auto">
      <h3 className="text-white text-2xl mb-4">Your Favorite Pokemon</h3>
      {FavoritePokems.length > 0 ? (
        FavoritePokems.map((data, index) => (
          <div
            key={index}
            className="bg-gray-800 mb-2 p-5 rounded-md flex flex-col items-center"
          >
            <h3 className="text-white">{catipalizeFirstLetter(data.name)}</h3>
            <img
              src={data?.sprites?.other?.home?.front_default}
              alt={data.name}
              className="w-[100px] h-[100px]"
            />
            <div className="mt-3">
            <LikePoke />
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No favorite Pokemon added yet.</p>
      )}
    </div>
  );
};

Fav.propTypes = {
  FavoritePokems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  catipalizeFirstLetter: PropTypes.func.isRequired,
};

export default Fav;
