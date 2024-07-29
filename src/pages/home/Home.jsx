import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import WhatsappToggle from "../../components/WhatsappToggle";
import "./style.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="px-3 md:px-10 mt-10 mb-10 mx-auto max-w-[1440px]">
        <div className="">
          <Outlet />
        </div>
      </div>
      <WhatsappToggle />
    </div>
  );
};

export default Home;
