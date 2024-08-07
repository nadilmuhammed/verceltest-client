import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiTrashCan } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase.config";
import { deleteUser } from "firebase/auth";
import { IoCamera } from "react-icons/io5";

const Profile = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [store, setStore] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (store.profilePic) {
      setProfilePicPreview(`/api/uploads/${store.profilePic}`);
    }
  }, [store.profilePic]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("profilePicInput").click();
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullname", store.fullname);
      formData.append("username", store.username);
      formData.append("email", store.email);
      if (store.password) {
        formData.append("password", store.password);
      }
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }
      formData.append("gender", selectedGender);
      const update = await axios.put(`/api/api/auth/update/${id}`, formData);
      const res = update.data;

      if (res.error) {
        throw new Error(res.error);
      }
      toast.success("Profile Upated");
      if (res.profilePic) {
        setProfilePicPreview(`/api/uploads/${res.profilePic}`);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const currentUser = auth.currentUser;
    try {
      if (currentUser) {
        // Delete the Firebase user
        await deleteUser(currentUser);

        // signing out from google
        await auth.signOut();
      }

      const response = await axios.delete(`/api/api/auth/deleteuser/${id}`);
      localStorage.removeItem("token");
      setAuthUser(null);
      toast.success("Account deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Error deleting account");
    }
  };

  const fetchData = async (id) => {
    try {
      setUserLoading(true);
      const response = await axios.get(`/api/api/auth/getusersbyid/${id}`);
      setStore(response.data);
      setSelectedGender(response.data.gender);
    } catch (error) {
      console.log(error.message);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <>
      {userLoading && (
        <div className="absolute bg-black/40 backdrop-blur-sm flex justify-center items-center w-full h-screen top-0 left-0 z-50">
          <span className="loading loading-dots loading-lg text-white" />
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="">
          <h1 className="text-3xl font-[550] text-center">
            Update your Profile
          </h1>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex justify-center">
              <div className="relative p-1">
                <img
                  src={profilePicPreview || store.gender === 'male' ? "/images/profile.png" : '/images/woman.png'}
                  alt="profile-pic"
                  className="w-20 h-20 rounded-full bg-cover"
                />
                <input
                  type="file"
                  id="profilePicInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <button
                  className="absolute bottom-3 right-0"
                  onClick={handleClick}
                >
                  <IoCamera size={20} />
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col gap-1">
                <label className="font-[500] text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="px-3 py-2 outline-none border border-black rounded-full"
                  name="fullname"
                  value={store.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-[500] text-sm">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="px-3 py-2 outline-none border border-black rounded-full"
                  name="username"
                  value={store.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-[500] text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 outline-none border border-black rounded-full"
                name="email"
                value={store.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-[500] text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter your new Password"
                className="px-3 py-2 outline-none border border-black rounded-full"
                name="password"
                value={store.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-5 justify-center">
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="gender"
                  value='male'
                  checked={selectedGender === 'male'}
                  onChange={handleGenderChange}
                />
                <label>Male</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="gender"
                  value='female'
                  checked={selectedGender === 'female'}
                  onChange={handleGenderChange}
                />
                <label>Female</label>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white px-3 py-2 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <span className="flex items-center gap-2">
                  <span>Update</span>
                  {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}
                </span>
              </button>
            </div>
          </form>

          <div className="w-full mt-14">
            <button
              onClick={() => document.getElementById("my_modal_2").showModal()}
              className="btn flex justify-center items-center text-red-600 bg-transparent border-none w-full rounded-full hover:bg-transparent hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <GiTrashCan size={20} />
              <span>Delete Account</span>
            </button>
          </div>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <p className="py-4">
                Are you sure you want to delete this account.
              </p>
              <button
                onClick={handleDelete}
                className="btn btn-sm bg-red-600 text-white hover:bg-red-600"
              >
                Delete my Account
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default Profile;
