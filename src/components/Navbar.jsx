import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import clsx from "clsx";
import { auth } from "../firebase/firebase.config";

const Navbar = () => {
  const { setAuthUser, authUser } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const popupRef = useRef(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleLogout = async () => {
    const currentUser = auth.currentUser;
    try {
      if(currentUser){
        await auth.signOut();
      }

      setLoading(true)
      const response = await axios.post("/api/api/auth/logout");
      const res = response.data;
      if (res.error) {
        throw new Error(res.error);
      }
      localStorage.removeItem("token");
      setAuthUser(null);
      setLoading(false)
    } catch (error) {
      console.log(error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="bg-black">
      <div className="px-3 md:px-10 py-3 md:py-5 text-white max-w-[1440px] mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpen}
              className="btn btn-sm p-0 block md:hidden bg-transparent hover:bg-transparent text-white border-none"
            >
              <RiMenu2Fill size={25} className="" />
            </button>
            <Link to="/">Logo</Link>
          </div>
         
            <div
              className={clsx(
                "fixed w-screen h-full md:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all",
                open && "translate-x-0"
              )}
            >
              <div ref={popupRef} className="absolute flex flex-col gap-8 left-0 top-0 p-3 z-50 bg-black text-white  rounded h-screen w-56">
                <div>
                  <button onClick={() => setOpen(false)}>
                    <IoClose size={32} className="" />
                  </button>
                </div>
                <div className="flex flex-col gap-5" onClick={() => setOpen(false)}>
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              </div>
            </div>

          <div className="hidden md:block ">
            <div className="flex gap-5">
              <div className="flex items-center gap-5">
                <Link
                  to="/"
                  className="hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  Contact
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to={authUser && authUser._id ? `/profile/${authUser._id}` : "#"}
                  className="hover:scale-105 bg-white text-black p-[3px] hover:bg-black hover:text-white rounded transition-all duration-300 ease-in-out"
                >
                  <FaUser size={18} className="" />
                </Link>
                <button
                  className="bg-white text-black px-3 rounded border-2 hover:text-white hover:bg-transparent transition-all duration-300 ease-in-out"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                {loading && (
                <div className="absolute top-0 left-0 bg-black/50 w-full h-screen backdrop-blur-sm">
                  <div className="flex justify-center items-center h-screen">
                    <label className="loading loading-dots loading-lg"></label>
                  </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <div className="flex items-center gap-2">
              <Link to={authUser && authUser._id ? `/profile/${authUser._id}` : "#"}>
                <MdAccountBox size={32} />
              </Link>
              <button
                className="bg-white text-black px-2 rounded border-2 hover:text-white hover:bg-transparent transition-all duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
