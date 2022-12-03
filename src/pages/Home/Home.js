import React, { useContext } from "react";
import Banner from "../../components/Home/Banner/Banner";
import Categories from "../../components/Home/Categories/Categories";
import Featured from "../../components/Home/Featured/Featured";
import Slicks from "../../components/Home/Slick/Slicks";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Home = () => {
  const { title } = useContext(AuthContext);
  title("Home");
  return (
    <div>
      <Banner />
      <Categories />
      <Featured />
      <Slicks />
    </div>
  );
};

export default Home;
