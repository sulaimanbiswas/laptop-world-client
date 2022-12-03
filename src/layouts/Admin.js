import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { AuthContext } from "../Contexts/AuthProvider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/useBuyer";
import useSeller from "../hooks/useSeller";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="drawer drawer-mobile">
        <input id="sidebar-btn" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* <!-- Page content here --> */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="sidebar-btn" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            {isAdmin && (
              <>
                <li>
                  <NavLink to="all-seller">All Seller</NavLink>
                </li>
                <li>
                  <NavLink to="all-buyer">All Buyer</NavLink>
                </li>
                <li>
                  <NavLink to="reported-items">Reported Items</NavLink>
                </li>
              </>
            )}

            {isSeller && (
              <>
                <li>
                  <NavLink to="create-product">Create Product</NavLink>
                </li>
                <li>
                  <NavLink to="all-products">All Products</NavLink>
                </li>
              </>
            )}

            {isBuyer && (
              <li>
                <NavLink to="my-orders">My Orders</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
