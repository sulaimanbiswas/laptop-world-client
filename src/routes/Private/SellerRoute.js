import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useSeller from "../../hooks/useSeller";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  if (loading || isSellerLoading) {
    return <Loading />;
  }

  if (user?.uid && isSeller) {
    return children;
  }
  return <Navigate to="/" />;
};

export default SellerRoute;
