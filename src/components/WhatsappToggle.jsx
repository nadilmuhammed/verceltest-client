import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";

const WhatsappToggle = () => {
  return (
    <div className="relative">
      <div className="fixed bottom-5 right-10 ">
        <Link
          to="https://wa.me/+918330895127"
          target="_blank"
          className="btn p-0 bg-transparent hover:bg-transparent border-none"
        >
          <IoLogoWhatsapp size={34} color="green" />
        </Link>
      </div>
    </div>
  );
};

export default WhatsappToggle;
