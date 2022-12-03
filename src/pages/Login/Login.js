import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail, MdRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const { providerSignUpAndLogin, login, title } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [token] = useToken(loginEmail);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  title("Login");

  if (token) {
    navigate(from, { replace: true });
  }

  const loginHandle = (data) => {
    const { email, password } = data;
    login(email, password)
      .then(() => {
        setLoginEmail(email);
        toast.success("Successfully login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const googleLoginHandler = () => {
    providerSignUpAndLogin(googleProvider)
      .then((result) => {
        setLoginEmail(result?.user?.email);
        toast.success("Successfully login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className=" min-h-screen mx-auto flex justify-center items-center  ">
      <div className="w-full md:w-[385px] shadow-lg p-7 rounded-2xl flex flex-col">
        <h2 className="font-normal text-xl text-center">Login</h2>
        <form
          onSubmit={handleSubmit(loginHandle)}
          className="flex flex-col gap-3"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: "Email Address is required",
                })}
                type="email"
                className="  input input-bordered w-full"
              />
              <MdAlternateEmail className="absolute bottom-1/3 right-3" />
            </div>
            {errors.email && (
              <p className="text-error" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                type={showPass ? "password" : "text"}
                className="input input-bordered w-full"
              />
              <MdRemoveRedEye
                onClick={() => setShowPass(!showPass)}
                className="absolute bottom-1/3 right-3"
              />
            </div>
            {errors.password && (
              <p className="text-error" role="alert">
                {errors.password?.message}
              </p>
            )}
            <label className="label">
              <Link to="/forgot" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>
          <PrimaryBtn>Login</PrimaryBtn>
        </form>
        <div className="">
          <label className="label justify-center gap-1">
            <p className="label-text-alt ">New to Doctors Portal?</p>
            <Link
              to="/signup"
              className="label-text-alt link no-underline link-hover link-secondary"
            >
              Register now
            </Link>
          </label>
        </div>
        <div className="divider">OR</div>
        <button
          onClick={googleLoginHandler}
          className="btn btn-outline btn-primary"
        >
          <FcGoogle className="mr-1 w-7 h-7" />
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
