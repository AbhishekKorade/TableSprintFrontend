import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base_url } from "../config/base_url";
import { showSuccessToast } from "./Toast";

const EditCategory = () => {
  const { id } = useParams();
const navigate=useNavigate()
  // State to hold category data
  const [category, setCategory] = useState({
    name: "",
    sequence: "",
    status: "",
    image: "",
  });

  // Handle file upload
  const handleFileUpload = () => {
    document.getElementById("categoryImageInput").click();
  };

  const getSingleCategory = () => {
    axios
      .get(`${base_url}/api/categories/getbycategoryId/${id}`)
      .then((resp) => {
        setCategory(resp.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

const UpdateCategory = () =>{
  const payload = {
    name:category.name,
    sequence:category.sequence,
    image:category.image,
    status:category.status
  }
  axios.put(`${base_url}/api/categories/updateByCategoryId/${id}`,payload,{
    headers: {
      'Content-Type': 'multipart/form-data', 
    }
  })
  .then((resp)=>{
    console.log(resp.data)
    navigate('/Category')
    showSuccessToast('Category Update Sucessfully')
  })
  .catch((err)=>{
    console.log(err)
  })
}

  useEffect(() => {
    getSingleCategory();
  }, [id]);

  return (
    <div className="mx-4">
      <h2 className="font-semibold text-lg mb-10 text-gray-700">Edit Category</h2>

      <div className="grid grid-cols-3 gap-2">
        {/* Category Name */}
        <div className="relative mb-6">
          <input
            type="text"
            id="categoryName"
            value={category.name}  // Set value from state
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
          <label
            htmlFor="categoryName"
            className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 "
          >
            Category Name
          </label>
        </div>

        {/* Category Sequence */}
        <div className="relative mb-6">
          <input
            type="number"
            id="categorySequence"
            value={category.sequence}  // Set value from state
            onChange={(e) => setCategory({ ...category, sequence: e.target.value })}
            className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
          <label
            htmlFor="categorySequence"
            className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
          >
            Category Sequence
          </label>
        </div>

        {/* Status Dropdown */}
        <div className="relative mb-6">
          <select
            id="status"
            value={category.status}  // Set value from state
            onChange={(e) => setCategory({ ...category, status: e.target.value })}
            className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <label
            htmlFor="status"
            className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
          >
            Status
          </label>
        </div>

        {/* Upload File Button */}
        <div className="relative mb-6">
          <button
            type="button"
            onClick={handleFileUpload}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-600 hover:bg-[#662671] hover:text-white"
          >
            Upload File
          </button>
          <input
            type="file"
            id="categoryImageInput"
            className="hidden"
            accept="image/*"
            // Set the file input field value to the existing image URL or file
            onChange={(e) => setCategory({ ...category, image: e.target.files[0] })}
          />
          <label
            htmlFor="categoryImageInput"
            className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 "
          >
            Upload Image
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 cursor-pointer rounded-full text-gray-600 "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#662671] text-white rounded-full cursor-pointer"
          onClick={UpdateCategory}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
