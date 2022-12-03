import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useBuyer from "../../hooks/useBuyer";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

  if (loading || isBuyerLoading) {
    return <Loading />;
  }

  if (user?.uid && isBuyer) {
    return children;
  }
  return <Navigate to="/" />;
};

export default BuyerRoute;
