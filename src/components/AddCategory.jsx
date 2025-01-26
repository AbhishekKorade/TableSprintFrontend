import axios from "axios";
import React, { useState } from "react";
import { base_url } from "../config/base_url";
import { showSuccessToast } from "./Toast";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    categoryName: "",
    categorySequence: "",
    categoryImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); 
  };

  const handleFileUpload = () => {
    document.getElementById("categoryImageInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, categoryImage: file }));
      setErrors((prev) => ({ ...prev, categoryImage: "" })); 
    }
  };

  const handelClear = () => {
    setFormData({
      categoryName: "",
      categorySequence: "",
      categoryImage: null,
      setErrors:{}
    });
  };
  

  const validate = () => {
    const newErrors = {};
    if (!formData.categoryName.trim()) {
      newErrors.categoryName = "Category Name is required";
    }
    if (!formData.categorySequence.trim()) {
      newErrors.categorySequence = "Category Sequence is required";
    } else if (isNaN(formData.categorySequence)) {
      newErrors.categorySequence = "Category Sequence must be a number";
    }
    if (!formData.categoryImage) {
      newErrors.categoryImage = "Category Image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload={
      name:formData.categoryName,
      sequence:formData.categorySequence,
      image:formData.categoryImage
    }
    if (validate()) {
axios.post(`${base_url}/api/categories/addcategory`,payload,{
  headers: {
    'Content-Type': 'multipart/form-data', 
  }
})
.then((resp)=>{
  console.log(resp.data)
  showSuccessToast('Category Add Sucessfully')
  navigate('/Category')
  handelClear()
})
.catch((error)=>{
  console.log(error)
})
    }
  };

  return (
    <div className="mx-4">
      <h2 className="font-semibold text-lg mb-10 text-gray-700">Add Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">

          {/* Category Name */}
          <div className="relative mb-6">
            <input
              type="text"
              id="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className={`peer w-full border ${
                errors.categoryName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 outline-none`}
            />
            <label
              htmlFor="categoryName"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${
                errors.categoryName ? "text-red-500" : "text-gray-600"
              }`}
            >
              Category Name
            </label>
            {errors.categoryName && (
              <span className="text-red-500 text-sm">{errors.categoryName}</span>
            )}
          </div>

          {/* Category Sequence */}
          <div className="relative mb-6">
            <input
              type="number"
              id="categorySequence"
              value={formData.categorySequence}
              onChange={handleChange}
              className={`peer w-full border ${
                errors.categorySequence ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 outline-none`}
            />
            <label
              htmlFor="categorySequence"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${
                errors.categorySequence ? "text-red-500" : "text-gray-600"
              }`}
            >
              Category Sequence
            </label>
            {errors.categorySequence && (
              <span className="text-red-500 text-sm">{errors.categorySequence}</span>
            )}
          </div>

          {/* Upload File Button */}
          <div className="relative mb-6">
            <button
              type="button"
              onClick={handleFileUpload}
              className={`w-full border px-4 py-3 rounded-lg ${
                errors.categoryImage ? "border-red-500" : "border-gray-300"
              } bg-white text-gray-600 `}
            >
              {formData.categoryImage ? formData.categoryImage.name : "Upload File"}
            </button>
            <input
              type="file"
              id="categoryImageInput"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="categoryImageInput"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${
                errors.categoryImage ? "text-red-500" : "text-gray-600"
              }`}
            >
              Upload Image
            </label>
            {errors.categoryImage && (
              <span className="text-red-500 text-sm">{errors.categoryImage}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end items-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 cursor-pointer rounded-full text-gray-600"
            onClick={handelClear}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#662671] cursor-pointer text-white rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
