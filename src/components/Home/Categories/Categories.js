import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";
import Category from "./Category";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    logOut,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        "https://laptop-world-server.vercel.app/categories"
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
      {categories &&
        categories.map((category) => (
          <Category key={category._id} category={category} />
        ))}
    </div>
  );
};

export default Categories;
