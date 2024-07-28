import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { signInWithCustomToken, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase.config";

const Login = () => {
  const { setAuthUser } = useAuthContext();
  const [view, setView] = useState(false);
  const [loading, setLoaing] = useState(false);
  const [gloading, setGloading] = useState(false);
  const [store, setStore] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevData) => ({
      ...prevData,
      [name]: "",
    }));
  };

  const handleView = () => {
    setView(!view);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = {};
    for (const key in store) {
      if (!store[key]) {
        newErrors[key] = "This field is required";
        hasErrors = true;
      }
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoaing(true);
      const response = await axios.post("/api/api/auth/signin", {
        username: store.username,
        email: store.email,
        password: store.password,
      });
      const res = response.data;
      if (res.error) {
        throw new Error(res.error);
      }
      localStorage.setItem("token", JSON.stringify(res));
      setAuthUser(res);
      toast.success("Logged In");
      setLoaing(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.error);
    } finally {
      setLoaing(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      setGloading(true);
      const response = await axios.post("/api/api/auth/googlelogin", {
        idToken,
      });

      const res = response.data;
      if (res.error) {
        throw new Error(res.error);
      }
      localStorage.setItem("token", JSON.stringify(res));
      setAuthUser(res);
      toast.success("Logged In");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.error);
    } finally {
      setGloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen min-h-screen p-5 mx-auto">
      <div className=" flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-[600] text-center">
          Login to Your Account
        </h1>
        <div className="w-full">
          <button
            onClick={handleGoogleLogin}
            className="relative flex justify-center items-center border border-gray-300 w-full rounded-full btn btn-sm outline-none"
          >
            <span className="flex items-center gap-2">
              <span>
                <FcGoogle size={25} />
              </span>
              <span className="font-[500] text-sm">Sign In with google</span>
            </span>
            {gloading && (
              <label className="absolute right-3 loading loading-spinner loading-sm"></label>
            )}
          </button>
        </div>
        <div className="w-full flex items-center gap-3">
          <p className="border border-gray-300 w-full h-0"></p>
          <span className="text-gray-500">or</span>
          <p className="border border-gray-300 w-full h-0"></p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-[500]">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="border border-gray-300 rounded-full p-2 outline-none px-3"
              name="username"
              value={store.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-[500]">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-full p-2 outline-none px-3"
              name="email"
              value={store.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-[500]">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="border border-gray-300 rounded-full  px-3 flex justify-between items-center">
              <input
                type={view ? "text" : "password"}
                placeholder="Enter your password"
                className="p-2 outline-none"
                name="password"
                value={store.password}
                onChange={handleChange}
              />
              <span onClick={handleView} className="cursor-pointer">
                {view ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="w-full hover:scale-105 transition-all duration-300 ease-in-out">
            <button
              type="submit"
              className="w-full p-2 rounded-full bg-black text-white relative"
            >
              Sign In
              {loading && (
                <div className="loading loading-spinner loading-sm absolute right-4"></div>
              )}
            </button>
          </div>

          <div className="text-sm">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700 font-[600]"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
