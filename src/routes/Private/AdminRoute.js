import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  if (loading || isAdminLoading) {
    return <Loading />;
  }

  if (user?.uid && isAdmin) {
    return children;
  }
  return <Navigate to="/" />;
};

export default AdminRoute;
