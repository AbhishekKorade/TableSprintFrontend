import React from 'react'
import DashBoardLogo from '../assets/images/TableSprintIcon.png'

const Dashboard = () => {
 
  return (
    <div>
    
    <div className=' flex flex-col justify-center items-center h-[80vh]'>
      <div className='flex justify-center items-center'>
    <img src={DashBoardLogo} alt="" />
    </div>
    <p className=' text-lg'>Welcome to TableSprint  admin</p>
    </div>
    </div>
  )
}

export default Dashboard
