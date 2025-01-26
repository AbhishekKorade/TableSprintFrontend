import React, { useState } from 'react';
import LoginBgImage from '../assets/images/LoginBgImage.png';
import TableSprintIcon from '../assets/images/TableSprintIcon.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../config/base_url';
import { showSuccessToast } from './Toast';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleSubmit = (e) => {
    // showSuccessToast("This is a success message!")
    e.preventDefault(); 

    const payload={
      email:email,
      password:password
    }

    axios.post(`${base_url}/api/auth/login`,payload)
    .then((resp)=>{
      console.log(resp)
      showSuccessToast('Login Sucessfully')
      localStorage.setItem("isLogin",true)
      navigate('/Dashboard');
    })
    .catch((err)=>{
      console.log(err)
    })
    
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true); 
  };

  const handleCloseModal = () => {
    setShowForgotPasswordModal(false); 
  };

  return (
    <div className="relative w-full h-screen">
      <img 
        src={LoginBgImage} 
        alt="Login Background" 
        className="absolute top-0 left-0 w-full h-[100vh] object-cover"
      />
      
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-8 rounded-sm bg-white bg-opacity-75 shadow-lg w-1/3 mx-[7rem]">
        <div className="flex justify-center items-center">
          <img src={TableSprintIcon} alt="TableSprint Icon" />
        </div>
        <p className="text-center">Welcome to TableSprint admin</p>
        <form onSubmit={handleSubmit} className="mt-[2rem]"> 
          <div className="mb-6 relative">
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 border rounded-lg bg-white outline-none pl-6"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label 
              htmlFor="email" 
              className="absolute top-0 left-6 text-sm bg-white px-2 text-gray-600 transform -translate-y-1/2"
            >
              Email ID
            </label>
          </div>

          <div className="mb-4 relative">
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-2 border rounded-lg bg-white outline-none pl-6"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <label 
              htmlFor="password" 
              className="absolute top-0 left-6 text-sm bg-white px-2 text-gray-600 transform -translate-y-1/2"
            >
              Password
            </label>
          </div>
          
          <p 
            onClick={handleForgotPasswordClick} 
            className="text-end text-[#5C218B] cursor-pointer"
          >
            Forgot Password?
          </p>
          
          <button 
            type="submit" 
            className="w-full bg-[#5C218B] cursor-pointer text-white mt-[3rem] px-4 py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>

      {showForgotPasswordModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h3 className="text-lg text-[#5C218B] text-center font-semibold mb-4">Did you forget password?</h3>
            <p className=' text-[#8F8F8F]'>Enter your email address and we’ll send you a link to restore password</p>
            <div className=' px-[2rem]'>
            <form className=' mt-3'>
              <div className="mb-4">
                <label htmlFor="forgot-email" className="block text-sm text-gray-600">Enter your Email ID</label>
                <input 
                  type="email" 
                  id="forgot-email" 
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none mt-2"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#5C218B] cursor-pointer text-white px-4 py-2 rounded-lg"
              >
                Request reset link
              </button>
            </form>
            <button 
              onClick={handleCloseModal} 
              className="mt-4 text-center cursor-pointer w-full underline text-sm text-gray-600"
            >
              Back to Login
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
