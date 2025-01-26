import React, { useState } from 'react';
import TableSprintIcon from '../assets/images/NavbarLogo.svg';
import LogoutIcon from '../assets/images/LogoutIcon.svg';
import DangerIcon from '../assets/images/DangerIcon.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate()
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleLogout = () => {
   localStorage.setItem("isLogin",false)
    setIsModelOpen(false);
    navigate('/')
  };


  const handleCancel = () => {
    setIsModelOpen(false);
  };

  return (
    <div className="fixed top-0 w-screen">
      {/* Navbar */}
      <div className="bg-[#662671] py-3 px-4 flex justify-between">
        <img src={TableSprintIcon} alt="Logo" />
        <img
          src={LogoutIcon}
          alt="Logout"
          className="cursor-pointer"
          onClick={() => setIsModelOpen(true)}
        />
      </div>

      {/* Logout Confirmation Modal */}
      {isModelOpen && (
  <div className="fixed  inset-0 top-[14%] left-[300px] z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
     
      <div className=' flex flex-col justify-center items-center'> 
      <div className=' flex gap-2 justify-center items-center'>
        <img src={DangerIcon} alt="" className=' h-[40px] w-[40px]'/>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 "  >
         Log Out
      </h2> 
        </div>   
      <p className="text-gray-600 mb-6">
      Are you sure you want to log out?
      </p>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          className="px-6 py-1 cursor-pointer bg-[#FFFFFF] text-[#767676] border rounded-full "
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 cursor-pointer bg-[#662671] text-[#FFFFFF] border rounded-full "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Navbar;
