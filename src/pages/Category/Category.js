import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Product from "../../components/Category/Product/Product";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Category = () => {
  const { name, img } = useLoaderData();
  const { title } = useContext(AuthContext);
  title(name);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", name],
    queryFn: async () => {
      const res = await fetch(
        `https://laptop-world-server.vercel.app/category-products?category=${name}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="hero" style={{ backgroundImage: `url(${img})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold">Brand: {name}</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {products &&
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
