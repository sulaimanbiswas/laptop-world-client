import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const AllBuyers = () => {
  const { title, logOut } = useContext(AuthContext);
  const [deletingBuyer, setDeletingBuyer] = useState(null);
  const {
    data: buyers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(`https://laptop-world-server.vercel.app/users/buyers`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
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
  title("All Buyers");

  const deleteBuyerHandle = (buyer) => {
    fetch(`https://laptop-world-server.vercel.app/buyer/${buyer._id}`, {
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
    setDeletingBuyer(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-14">
      <div className="">
        <h3 className="text-2xl">Total User: {buyers.length}</h3>
      </div>
      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {buyers &&
                buyers.map((buyer, i) => (
                  <tr key={buyer._id}>
                    <th>{i + 1}</th>
                    <td>{buyer.name}</td>
                    <td>{buyer.email}</td>

                    <td>
                      <label
                        htmlFor="confirmation-modal"
                        onClick={() => setDeletingBuyer(buyer)}
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
      {deletingBuyer && (
        <ConfirmationModal
          title={`Ate you sure to delete ${deletingBuyer.name}`}
          message={`If you delete ${deletingBuyer.name}. You cannot recover it`}
          modalData={deletingBuyer}
          closeModal={closeModal}
          successAction={deleteBuyerHandle}
          successColor="btn-error"
        />
      )}
    </div>
  );
};

export default AllBuyers;
