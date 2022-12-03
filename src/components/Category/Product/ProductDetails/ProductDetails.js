import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider/AuthProvider";
import BuyProduct from "../BuyProduct/BuyProduct";

const ProductDetails = () => {
  const { title, user } = useContext(AuthContext);
  const [buyProduct, setBuyProduct] = useState(null);
  const product = useLoaderData();
  const navigate = useNavigate();

  const {
    _id,
    name,
    address,
    resalePrice,
    originalPrice,
    condition,
    useYear,
    category,
    sellerName,
    discretion,
    image,
    date,
    verifiedSeller,
    sold,
  } = product;

  useEffect(() => {
    fetch(`https://laptop-world-server.vercel.app/product/${_id}`)
      .then((res) => res.json())
      .then((data) => setBuyProduct(data));
  }, [_id]);

  title(name);

  const handleReport = (id) => {
    fetch(`https://laptop-world-server.vercel.app/report/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          toast.success("Submit report to admin successfully");
        }
      });
  };

  const handleOrder = (event) => {
    event.preventDefault();

    const form = event.target;

    const orderedProduct = {
      name,
      resalePrice,
      category,
      customerName: user.displayName,
      location: form.location.value,
      customerPhone: form.phone.value,
      customerEmail: user.email,
    };

    axios
      .post("https://laptop-world-server.vercel.app/orders", orderedProduct)
      .then(function (response) {
        if (response.statusText === "OK") {
          setBuyProduct(null);
          updateProduct(_id);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    const updateProduct = (id) => {
      fetch(`https://laptop-world-server.vercel.app/products/${id}`, {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.matchedCount > 0) {
            navigate("/");
            toast.success("Order Successful");
          }
        });
    };
  };

  return (
    <div className="card w-full md:w-1/2 bg-base-100 shadow-xl mx-auto">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <div className="card-actions justify-between">
          <p>Publish date: {date ? date : "No date found"}</p>
          <button
            onClick={() => handleReport(_id)}
            className="btn btn-error btn-sm btn-outline"
          >
            Report
          </button>
        </div>
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-between">
          <div className="">
            <p className="flex items-center gap-2">
              SellerName: {sellerName}
              {verifiedSeller && <MdVerified className="text-green-600" />}
            </p>
            <p> Resale Price: ${resalePrice}</p>
            <p>Brand: {category}</p>
            <p>Condition: {condition}</p>
          </div>
          <div className="">
            <p>Address: {address}</p>
            <p>Original Price: ${originalPrice}</p>
            <p>Use Of Year: {useYear}</p>
          </div>
        </div>
        <p>{discretion}</p>
        <div className="card-actions justify-end">
          <label
            htmlFor="order-product-modal"
            className={`btn btn-primary btn-outline ${sold && "btn-disabled"} `}
          >
            Buy Now
          </label>
        </div>
      </div>
      {buyProduct && (
        <BuyProduct product={product} user={user} handleOrder={handleOrder} />
      )}
    </div>
  );
};

export default ProductDetails;
