import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const AllProducts = () => {
  const { title, user, logOut } = useContext(AuthContext);
  const [deletingProducts, setDeletingProducts] = useState(null);
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user],
    queryFn: async () => {
      const res = await fetch(
        `https://laptop-world-server.vercel.app/products?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      if (data.message === "forbidden access") {
        return logOut()
          .then(() => {
            toast.success("Successfully Sign Out");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
      return data;
    },
  });

  // console.log(products);

  // if (products.message === "forbidden access") {
  //   logOut()
  //     .then(() => {
  //       toast.success("Successfully Sign Out");
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // }

  const handleFeatured = (id) => {
    fetch(`https://laptop-world-server.vercel.app/featured/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          toast.success("Product Featured Successfully");
          refetch();
        }
      });
  };

  title("All Products");

  const deleteProductsHandle = (product) => {
    fetch(`https://laptop-world-server.vercel.app/products/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("User Delete successfully");
        }
      });
  };
  const closeModal = () => {
    setDeletingProducts(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-14">
      <div className="">
        <h3 className="text-2xl">Total User: {products.length}</h3>
      </div>
      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Available</th>
                <th>Featured</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, i) => (
                  <tr key={product._id}>
                    <th>{i + 1}</th>
                    <th>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </div>
                    </th>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.resalePrice}</td>
                    <td>{product.sold ? "sold" : "Available"}</td>
                    <td>
                      {product?.featured ? (
                        "Featured"
                      ) : (
                        <dev>
                          <button
                            onClick={() => handleFeatured(product._id)}
                            className="btn btn-sm btn-secondary btn-outline"
                          >
                            Make Featured
                          </button>
                        </dev>
                      )}
                    </td>

                    <td>
                      <label
                        htmlFor="confirmation-modal"
                        onClick={() => setDeletingProducts(product)}
                        className="btn btn-md btn-circle btn-error btn-outline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </label>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!products && (
            <div className="text-center w-full">No Products Found</div>
          )}
        </div>
      </div>
      {deletingProducts && (
        <ConfirmationModal
          title={`Ate you sure to delete ${deletingProducts.name}`}
          message={`If you delete ${deletingProducts.name}. You cannot recover it`}
          modalData={deletingProducts}
          closeModal={closeModal}
          successAction={deleteProductsHandle}
          successColor="btn-error"
        />
      )}
    </div>
  );
};

export default AllProducts;
