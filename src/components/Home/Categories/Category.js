import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
  const { _id, name, icon } = category;
  return (
    <Link to={`/category/${_id}`}>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={icon} alt={name} className="rounded-full w-20 h-20" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Category;
