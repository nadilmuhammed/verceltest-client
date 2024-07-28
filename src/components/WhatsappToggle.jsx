import React from 'react'
import { IoLogoWhatsapp } from 'react-icons/io'

const WhatsappToggle = () => {
    const handleWhatsAppClick = () => {
        const mobileNumber = '+918330895127'; // Replace with your mobile number
        const whatsappUrl = `https://wa.me/${mobileNumber}`;
        window.location.href = whatsappUrl;
      };
  return (
    <div className='absolute bottom-5 right-10 '>
        <button onClick={handleWhatsAppClick} className='btn p-0 hover:bg-transparent border-none'>
        <IoLogoWhatsapp size={34} color='green'/>
        </button>
    </div>
  )
}

export default WhatsappToggle