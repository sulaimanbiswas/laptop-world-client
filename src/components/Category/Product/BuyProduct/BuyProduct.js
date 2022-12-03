import React from "react";

const BuyProduct = ({ product, user, handleOrder }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="order-product-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="order-product-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{product.name}</h3>
          <form onSubmit={handleOrder} className="flex flex-col gap-6 mt-12">
            <input
              required
              defaultValue={product.name}
              name="name"
              type="text"
              disabled
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              required
              defaultValue={product.resalePrice}
              name="resalePrice"
              type="number"
              disabled
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              required
              defaultValue={user && user.displayName}
              name="displayName"
              type="text"
              disabled
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              required
              name="location"
              type="text"
              placeholder="Meeting Address"
              className="input input-bordered w-full"
            />
            <input
              required
              name="phone"
              defaultValue={user && user.phone}
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            <input
              required
              name="email"
              defaultValue={user && user.email}
              type="email"
              disabled
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
