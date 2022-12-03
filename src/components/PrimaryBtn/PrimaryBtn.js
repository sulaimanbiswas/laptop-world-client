import React from "react";

const PrimaryBtn = ({ children }) => {
  return (
    <button type="submit" className="btn btn-primary">
      {children}
    </button>
  );
};

export default PrimaryBtn;
