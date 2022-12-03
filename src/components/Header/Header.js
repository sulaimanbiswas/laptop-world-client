import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const logOutHandler = () => {
    logOut()
      .then(() => {
        toast.success("Successfully Sign Out");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const menu = (
    <>
      {user ? (
        <li>
          <NavLink to="/dashboard" className="rounded">
            Dashboard
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/" className="rounded">
            Home
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/blog" className="rounded">
          Blog
        </NavLink>
      </li>

      {user ? (
        <li>
          <button onClick={logOutHandler} className="rounded">
            Logout
          </button>
        </li>
      ) : (
        <li>
          <NavLink to="/login" className="rounded">
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menu}
          </ul>
        </div>
        <Link to="/" className="font-bold normal-case text-xl">
          <h3>
            Laptop <span className="text-primary">World</span>
          </h3>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menu}</ul>
      </div>
      <label
        tabIndex={2}
        htmlFor="sidebar-btn"
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Header;
