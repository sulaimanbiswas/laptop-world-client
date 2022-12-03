import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  
  const { _id, name, image, resalePrice, originalPrice, useYear, } = product;
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure className="p-10 ">
        <img src={image} alt={name} className="rounded" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-between items-center">
          <p>Price: ${resalePrice}</p>
          <p>Old Price: ${originalPrice}</p>
          <p>Use of Year: {useYear}</p>
        </div>
        <div className="text-center mt-4">
          <Link to={`/product/${_id}`} className="btn btn-outline btn-primary">
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
