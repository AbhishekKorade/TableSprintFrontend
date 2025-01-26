

import React, { useEffect, useState } from "react";
import SubcategoryIcon from '../assets/images/SidebarIcons/Subcategory.svg'
import Search from '../assets/images/Search.svg'
import DangerIcon from '../assets/images/DangerIcon.svg'

import Demo from "../components/Demo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../config/base_url";
import Table from "../components/Table";

const Subcategory = () => {
  const navigate=useNavigate()
  const [allSubcategory,setAllSubcategory]=useState([])
 const [modalOpen, setModalOpen] = useState(false);
    const [deleteID,setDeleteId]=useState('')

  const columns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Sub Category Name" },
    { key: "name", label: "Category Name" },
    { key: "image", label: "Image" },
    { key: "status", label: "Status" },
    { key: "sequence", label: "Sequence" },
    { key: "action", label: "Action" },
  ];

  const link= [
    {edit:'EditSubcategory'},
  ]
  const handleModal=(val)=>{
    setModalOpen(val)
  }

  const deleteIddata = (val) =>{
    setDeleteId(val)
  }
  const deleteSubCategory = () => {
    axios.delete(`${base_url}/api/subcategories/deleteSubcategory/${deleteID}`)
    .then((resp)=>{
      console.log(resp.data)
      getAllSubcategoty()
      setModalOpen(false)
      showSuccessToast('Delete Category Sucessfully')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const getAllSubcategoty = () => {
    axios.get(`${base_url}/api/subcategories/getAllSubcategory`)
    .then((resp)=>{
      setAllSubcategory(resp.data.subCategories)
      console.log(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getAllSubcategoty()
  },[])

  return (
    <>
    <div className=" flex justify-between items-center px-2">
     
      <div className=" flex justify-between items-center gap-4">
    <img src={SubcategoryIcon} alt="" className=' h-[22px] w-[22px]'/>
    <p className=' font-semibold'>Subcategory</p>
    <div className=" flex justify-center items-center gap-2 border rounded-md p-2 h-[30px]"> 
        <img src={Search} alt="" className=' h-[18px] w-[18px]'/>
        <input type="text" placeholder="search" className=" outline-none"/>
    </div>
   
    </div>
    <div>
      <button className='py-2 px-4 bg-[#662671] text-white rounded-md' onClick={()=>navigate('/AddSubcategory')}>Add Subcategory</button>
    </div>


    
    </div>
    <div className=" mt-3">
      <Table data={allSubcategory} columns={columns} link={link}  handleModal={handleModal} deleteIddata={deleteIddata}/>
    </div>
    {modalOpen && (
            <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
                <div className=" flex gap-2 justify-center items-center">
      <img src={DangerIcon} alt="" />
      <p>Delete</p>
      </div>
      <p className=" text-center">Are you sure you want to delete?</p>
                <div className=' flex gap-2 px-5 mt-3'>
               
                  
                 
                <button 
                  onClick={()=>setModalOpen(false)} 
                  className="mt-0 text-center cursor-pointer w-full border py-2 rounded-full text-sm text-gray-600"
                >
                  cancel
                </button>
                <button 
                    type="submit" 
                    className="w-full bg-[#5C218B] cursor-pointer text-white px-4 py-2 h-10 rounded-full"
                    onClick={deleteSubCategory}
                  >
                    delete
                  </button>
                </div>
                </div>
                </div>
          )}
    </>
  );
};

export default Subcategory;
