import { createBrowserRouter } from "react-router-dom";
import ProductDetails from "../../components/Category/Product/ProductDetails/ProductDetails";
import Error from "../../components/Error/Error";
import Admin from "../../layouts/Admin";
import Main from "../../layouts/Main";
import AllBuyers from "../../pages/Admin/AllBuyers/AllBuyers";
import AllProducts from "../../pages/Admin/AllProducts/AllProducts";
import AllSellers from "../../pages/Admin/AllSellers/AllSellers";
import CreateProduct from "../../pages/Admin/CreateProduct/CreateProduct";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import MyOrders from "../../pages/Admin/MyOrders/MyOrders";
import ReportedItems from "../../pages/Admin/ReportedItems/ReportedItems";
import Blog from "../../pages/Blog/Blog";
import Category from "../../pages/Category/Category";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import AdminRoute from "../Private/AdminRoute";
import BuyerRoute from "../Private/BuyerRoute";
import PrivateRoute from "../Private/PrivateRoute";
import SellerRoute from "../Private/SellerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://laptop-world-server.vercel.app/categories/${params.id}`),
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://laptop-world-server.vercel.app/product/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/all-products",
        element: (
          <SellerRoute>
            <AllProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/create-product",
        element: (
          <SellerRoute>
            <CreateProduct />
          </SellerRoute>
        ),
        loader: () => fetch("https://laptop-world-server.vercel.app/categories"),
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <BuyerRoute>
            <MyOrders />
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/all-seller",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyer",
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported-items",
        element: (
          <AdminRoute>
            <ReportedItems />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
