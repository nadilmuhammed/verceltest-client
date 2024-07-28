import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { auth, googleProvider } from "../../firebase/firebase.config.js";
import { signInWithPopup } from "firebase/auth";

const Register = () => {
  const { setAuthUser } = useAuthContext();
  const [view, setView] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleView = () => {
    setView(!view);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setGenderError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
        hasErrors = true;
      }
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    if (!selectedGender) {
      setGenderError("Please select gender");
      return;
    }

    if (!checked) {
      setCheckedError("You must agree to the Terms, Privacy Policy, and Fees.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", {
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmpassword: formData.cpassword,
        gender: selectedGender,
      });
      const res = response.data;
      if (res.error) {
        throw new Error(res.error);
      }
      localStorage.setItem("token", JSON.stringify(res));
      setAuthUser(res);
      toast.success("Registered");
    } catch (error) {
      console.log(error.response.data.error);
      toast.error("Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      // Send user details to the backend
      const response = await axios.post("/api/auth/googleauth", {
        idToken,
        email: user.email,
        displayName: user.displayName,
      });
      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("token", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Welcome");
      // Handle the response from the backend
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-5">
      <div className=" flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-[600] text-center">Create Your Account</h1>
        <div className="w-full">
          <button
            onClick={handleGoogleAuth}
            className="relative btn btn-sm flex justify-center items-center border border-gray-300 w-full rounded-full"
          >
            <span className="flex items-center gap-2">
              <span>
                <FcGoogle size={25} />
              </span>
              <span className="font-[500] text-sm">Sign Up with google</span>
            </span>
            {loading && (
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
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className="text-sm font-[500]">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border border-gray-300 rounded-full p-2 outline-none px-3"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
              {errors.fullname && (
                <p className="text-red-500">Field is Empty</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className="text-sm font-[500]">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="border border-gray-300 rounded-full p-2 outline-none px-3"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500">Field is Empty</p>
              )}
            </div>
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
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">Field is Empty</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
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
                  value={formData.password}
                  onChange={handleChange}
                />
                <span onClick={handleView} className="cursor-pointer">
                  {view ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500">Field is Empty</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-[500]">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="border border-gray-300 rounded-full  px-3 flex justify-between items-center">
                <input
                  type={view ? "text" : "password"}
                  placeholder="Enter password"
                  className="p-2 outline-none"
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange}
                />
                <span onClick={handleView} className="cursor-pointer">
                  {view ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              {errors.cpassword && (
                <p className="text-red-500">Field is Empty</p>
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={selectedGender === "male"}
                  onChange={handleGenderChange}
                />
                <label>Male</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={selectedGender === "female"}
                  onChange={handleGenderChange}
                />
                <label>Female</label>
              </div>
            </div>
            {genderError && (
              <p className="text-red-500 text-center text-sm">Select One</p>
            )}
          </div>

          <div>
            <div className="text-sm flex gap-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <span>I agree to all Term, Privacy Policy and Fees</span>
            </div>
            {checkedError && (
              <p className="text-red-500 text-sm">{checkedError}</p>
            )}
          </div>

          <div className="w-full hover:scale-105 transition-all duration-300 ease-in-out">
            <button
              type="submit"
              className="w-full p-2 hover:bg-black rounded-full bg-black text-white relative"
            >
              Sign Up
              {loading && (
                <div className="loading loading-spinner loading-sm absolute right-4"></div>
              )}
            </button>
          </div>

          <div className="text-sm">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-[600]"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
