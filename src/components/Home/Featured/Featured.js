import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Loading/Loading";
import FeaturedItems from "./FeaturedItems";

const Featured = () => {
  const { data: featuredItems, isLoading } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const res = await fetch(`https://laptop-world-server.vercel.app/featured`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  console.log(featuredItems);

  return (
    <>
      {featuredItems.length > 0 && (
        <div>
          <div className="mt-10">
            <h3 className="text-center text-4xl font-bold">Featured Items</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mx-5">
            {featuredItems ? (
              featuredItems.map((featured) => (
                <FeaturedItems key={featured._id} featured={featured} />
              ))
            ) : (
              <div>No Featured Product Available</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Featured;
