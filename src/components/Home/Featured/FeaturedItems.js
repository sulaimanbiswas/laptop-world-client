import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const FeaturedItems = ({ featured }) => {
  const { _id, name, image, resalePrice, originalPrice } = featured;
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-between items-center">
          <p>Resale price: ${resalePrice} </p>
          <p>Original Price: ${originalPrice} </p>
          <Link to={`/product/${_id}`} className="btn btn-outline btn-primary">
            <MdArrowRightAlt />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedItems;
