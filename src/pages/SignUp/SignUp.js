import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail, MdPerson, MdRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";

const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
  const { providerSignUpAndLogin, signUp, updateUser, title } =
    useContext(AuthContext);
  const [showPass, setShowPass] = useState(true);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  title("Signup");

  if (token) {
    navigate("/");
  }

  const signUpHandle = (data) => {
    const { name, email, password, seller } = data;
    const userInfo = {
      displayName: name,
    };

    signUp(email, password)
      .then(() => {
        updateUser(userInfo)
          .then(() => {
            saveUser(name, email, seller);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const googleSignUpHandler = () => {
    providerSignUpAndLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.displayName, user.email);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const saveUser = (name, email, seller) => {
    const user = { name, email };
    seller ? (user.role = "seller") : (user.role = "buyer");

    fetch("https://laptop-world-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
        toast.success("Successfully signup");
      });
  };

  return (
    <div className=" min-h-screen mx-auto flex justify-center items-center  ">
      <div className="w-full md:w-[385px] shadow-lg p-7 rounded-2xl flex flex-col">
        <h2 className="font-normal text-xl text-center">Sign up</h2>
        <form
          onSubmit={handleSubmit(signUpHandle)}
          className="flex flex-col gap-3"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <div className="relative">
              <input
                {...register("name", { required: "this is a required" })}
                type="text"
                className="input input-bordered w-full"
              />
              <MdPerson className="absolute bottom-1/3 right-3" />
            </div>
            {errors.name && (
              <p className="text-error">{errors.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: "this is a required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="input input-bordered w-full"
              />
              <MdAlternateEmail className="absolute bottom-1/3 right-3" />
            </div>
            {errors.email && (
              <p className="text-error">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "this is a required",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                    message: "Password must be Strong",
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
              <p className="text-error">{errors.password?.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label justify-start gap-5 cursor-pointer">
              <input
                {...register("seller")}
                type="checkbox"
                className="checkbox"
              />
              <span className="label-text">Seller Account</span>
            </label>
          </div>
          <PrimaryBtn>Signup</PrimaryBtn>
        </form>
        <div className="">
          <label className="label justify-center gap-1">
            <p className="label-text-alt ">Already have an account?</p>
            <Link
              to="/login"
              className="label-text-alt link no-underline link-hover link-secondary"
            >
              Login now
            </Link>
          </label>
        </div>
        <div className="divider">OR</div>
        <button
          onClick={googleSignUpHandler}
          className="btn btn-outline btn-primary"
        >
          <FcGoogle className="mr-1 w-7 h-7" />
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
