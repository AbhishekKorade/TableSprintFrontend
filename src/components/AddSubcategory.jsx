import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../config/base_url";
import { showSuccessToast } from "./Toast";
import { useNavigate } from "react-router-dom";

const AddSubcategory = () => {
const  navigate = useNavigate()
  const [categoryOption,setCategoryOption]=useState([])
  const [formData, setFormData] = useState({
    category: "active", // Set default category as active
    subCategoryName: "",
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

  const handleClear = () => {
    setFormData({
      category: "Active",
      subCategoryName: "",
      categorySequence: "",
      categoryImage: null,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.subCategoryName.trim()) {
      newErrors.subCategoryName = "Subcategory Name is required";
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

  const getCategory=()=>{
    axios.get(`${base_url}/api/categories/getAllCategory`)
    .then((resp)=>{
      setCategoryOption(resp.data)
      console.log(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

useEffect(()=>{
  getCategory()
},[])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const payload = {
        category: formData.category,
        name: formData.subCategoryName,
        sequence: formData.categorySequence,
        image: formData.categoryImage,
      };
axios.post(`${base_url}/api/subcategories/addSubcategory`,payload, {
  headers: {
    'Content-Type': 'multipart/form-data', 
  }
})
.then((resp)=>{
  console.log(resp.data)
  showSuccessToast('Subcategory Add Sucessfully')
  navigate('/Subcategory')
  handleClear();
})
.catch((err)=>{
  console.log(err)
})    
    }
  };

  return (
    <div className="mx-4">
      <h2 className="font-semibold text-lg mb-10 text-gray-700">Add Subcategory</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-2">

          {/* Category */}
          <div className="relative mb-6">
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className={`peer w-full border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 outline-none`}
            >
              <option>Select Category</option>
             {
              categoryOption.map((item)=>(
                <option value={item._id}>{item.name}</option>
              ))
             }
            </select>
            <label
              htmlFor="category"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${errors.category ? "text-red-500" : "text-gray-600"}`}
            >
              Category
            </label>
          </div>

          {/* Subcategory Name */}
          <div className="relative mb-6">
            <input
              type="text"
              id="subCategoryName"
              value={formData.subCategoryName}
              onChange={handleChange}
              className={`peer w-full border ${errors.subCategoryName ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 outline-none`}
            />
            <label
              htmlFor="subCategoryName"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${errors.subCategoryName ? "text-red-500" : "text-gray-600"}`}
            >
              Subcategory Name
            </label>
            {errors.subCategoryName && (
              <span className="text-red-500 text-sm">{errors.subCategoryName}</span>
            )}
          </div>

          {/* Category Sequence */}
          <div className="relative mb-6">
            <input
              type="number"
              id="categorySequence"
              value={formData.categorySequence}
              onChange={handleChange}
              className={`peer w-full border ${errors.categorySequence ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 outline-none`}
            />
            <label
              htmlFor="categorySequence"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${errors.categorySequence ? "text-red-500" : "text-gray-600"}`}
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
              className={`w-full border px-4 py-3 rounded-lg ${errors.categoryImage ? "border-red-500" : "border-gray-300"} bg-white text-gray-600`}
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
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${errors.categoryImage ? "text-red-500" : "text-gray-600"}`}
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
            onClick={handleClear}
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

export default AddSubcategory;
