import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="card min-h-screen bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src="https://i.ibb.co/hYZs76X/404-page.jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <div className="card-actions">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
