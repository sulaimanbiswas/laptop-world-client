import { format } from "date-fns";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const CreateProduct = () => {
  const categories = useLoaderData();
  const { user } = useContext(AuthContext);

  const date = format(new Date(), "PP");

  const { title } = useContext(AuthContext);
  title("Create Product");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imageBb_key;

  const handleAddDoctor = (data) => {
    console.log(data);

    const image = data.image[0];
    const formData = new FormData();
    const sellerName = user?.displayName;
    const email = user?.email;

    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const product = {
            name: data.name,
            address: data.address,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
            condition: data.condition,
            useYear: data.useYear,
            category: data.category,
            sellerName,
            email,
            discretion: data.discretion,
            image: imgData.data.url,
            featured: data.featured,
            date,
            verifiedSeller: user.verified,
          };

          fetch("https://laptop-world-server.vercel.app/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                toast.success("Product Added successfully");
                navigate("/dashboard/all-products");
              }
              if (data.message === "forbidden access") {
                toast.error("product add only can a seller");
              }
            });
        }
      });
  };

  return (
    <div className="p-14">
      <div className="">
        <h3 className="text-2xl">Add A Doctor</h3>
      </div>
      <div className="mt-6 flex justify-center items-center">
        <div className="w-full  md:w-[385px] shadow-lg p-7 rounded-2xl flex flex-col  bg-base-100">
          <form
            onSubmit={handleSubmit(handleAddDoctor)}
            className="flex flex-col gap-3"
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <div className="relative">
                <input
                  {...register("name", { required: "this is a required" })}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              {errors.name && (
                <p className="text-error">{errors.name?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Full Address</span>
              </label>
              <div className="relative">
                <input
                  {...register("address", { required: "this is a required" })}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
              {errors.address && (
                <p className="text-error">{errors.address?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Resale Price</span>
              </label>
              <div className="relative">
                <input
                  {...register("resalePrice", {
                    required: "this is a required",
                  })}
                  type="number"
                  min="0"
                  className="input input-bordered w-full"
                />
              </div>
              {errors.resalePrice && (
                <p className="text-error">{errors.resalePrice?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Original Price</span>
              </label>
              <div className="relative">
                <input
                  {...register("originalPrice", {
                    required: "this is a required",
                  })}
                  min="0"
                  type="number"
                  className="input input-bordered w-full"
                />
              </div>
              {errors.originalPrice && (
                <p className="text-error">{errors.originalPrice?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product Condition</span>
              </label>
              <div className="relative">
                <select
                  {...register("condition", { required: "this is a required" })}
                  name="condition"
                  className="select select-bordered w-full "
                  required
                >
                  <option className="hidden" value="">
                    Select a Condition
                  </option>
                  <option className="" value="excellent">
                    Excellent
                  </option>
                  <option className="" value="good">
                    Good
                  </option>
                  <option className="" value="fair">
                    Fair
                  </option>
                </select>
              </div>
              {errors.condition && (
                <p className="text-error">{errors.condition?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Use of year</span>
              </label>
              <div className="relative">
                <input
                  {...register("useYear", {
                    required: "this is a required",
                  })}
                  min="0"
                  type="number"
                  className="input input-bordered w-full"
                />
              </div>
              {errors.useYear && (
                <p className="text-error">{errors.useYear?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product Category</span>
              </label>
              <div className="relative">
                <select
                  {...register("category", { required: "this is a required" })}
                  name="category"
                  className="select select-bordered w-full "
                  required
                >
                  <option className="hidden" value="">
                    Select a Category
                  </option>

                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.category && (
                <p className="text-error">{errors.category?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product Discretion</span>
              </label>
              <div className="relative">
                <textarea
                  {...register("discretion", {
                    required: "this is a required",
                  })}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              {errors.discretion && (
                <p className="text-error">{errors.discretion?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <div className="relative">
                <input
                  {...register("image", { required: "this is a required" })}
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              {errors.image && (
                <p className="text-error">{errors.image?.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label justify-start gap-5 cursor-pointer">
                <input
                  {...register("featured")}
                  type="checkbox"
                  className="checkbox"
                />
                <span className="label-text">Featured Product</span>
              </label>
            </div>

            <PrimaryBtn>Create Product</PrimaryBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
