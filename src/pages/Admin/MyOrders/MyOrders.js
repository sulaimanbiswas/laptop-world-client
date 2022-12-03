import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const MyOrders = () => {
  const { title, user, logOut } = useContext(AuthContext);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => {
      const res = await fetch(
        `https://laptop-world-server.vercel.app/orders?email=${user?.email}`,
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

  title("My Orders");

  const deleteOrderHandle = (orders) => {
    fetch(`https://laptop-world-server.vercel.app/orders/${orders._id}`, {
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
    setDeletingOrder(null);
  };

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="p-14">
      <div className="">
        <h3 className="text-2xl">My Order</h3>
      </div>
      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Customer Name</th>
                <th>Location</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}

              {orders &&
                orders.map((order, i) => (
                  <tr key={order._id}>
                    <th>{i + 1}</th>
                    <td>{order.name}</td>
                    <td>{order.resalePrice}</td>
                    <td>{order.customerName}</td>
                    <td>{order.location}</td>
                    <td>{order.customerPhone}</td>
                    <td>{order.customerEmail}</td>

                    <td>
                      <label
                        htmlFor="confirmation-modal"
                        onClick={() => setDeletingOrder(order)}
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
        </div>
      </div>
      {deletingOrder && (
        <ConfirmationModal
          title={`Ate you sure to delete ${deletingOrder.name}`}
          message={`If you delete ${deletingOrder.name}. You cannot recover it`}
          modalData={deletingOrder}
          closeModal={closeModal}
          successAction={deleteOrderHandle}
          successColor="btn-error"
        />
      )}
    </div>
  );
};

export default MyOrders;
