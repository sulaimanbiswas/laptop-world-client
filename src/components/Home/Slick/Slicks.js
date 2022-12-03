import React from "react";
import { AiFillGift, AiOutlineRedo } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";

const Slicks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-20 mx-20">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="px-2 pt-2">
          <TbTruckDelivery className="w-16" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Free Shopping</h2>
          <p>Order over $50</p>
        </div>
      </div>

      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="px-2 pt-2">
          <AiOutlineRedo className="w-16" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Easy Return</h2>
          <p>Within 10 days</p>
        </div>
      </div>

      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="px-2 pt-2">
          <FiLock className="w-16" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Secure Payment</h2>
          <p>Online Shopping</p>
        </div>
      </div>

      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="px-2 pt-2">
          <AiFillGift className="w-16" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Best Offer</h2>
          <p>Guaranteed</p>
        </div>
      </div>
    </div>
  );
};

export default Slicks;
