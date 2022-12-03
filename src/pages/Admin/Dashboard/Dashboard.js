import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";
import AllProducts from "../AllProducts/AllProducts";
import AllSellers from "../AllSellers/AllSellers";
import MyOrders from "../MyOrders/MyOrders";

const Dashboard = () => {
  const { title, user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  title("Dashboard");

  if (isAdmin) {
    return <AllSellers />;
  }
  if (isSeller) {
    return <AllProducts />;
  }

  return <MyOrders />;
};

export default Dashboard;
