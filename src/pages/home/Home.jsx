import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import WhatsappToggle from "../../components/WhatsappToggle";

const Home = () => {
  return (
    <div>
      <Navbar />
      <WhatsappToggle />
      <div className="px-3 md:px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
