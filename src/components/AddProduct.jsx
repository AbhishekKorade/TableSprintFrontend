import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../config/base_url";
import { showSuccessToast } from "./Toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
const navigate=useNavigate()
    const [categoryOption,setCategoryOption]=useState([])
    const [subCategoryOption,setSubCategoryOption]=useState([])
  

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    productName: "",
    productImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); 
  };

  const handleFileUpload = () => {
    document.getElementById("productImageInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, productImage: file }));
      setErrors((prev) => ({ ...prev, productImage: "" })); 
    }
  };

  const handelClear = () => {
    setFormData({
      category: "",
      subcategory: "",
      productName: "",
      productImage: null,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }
    if (!formData.subcategory.trim()) {
      newErrors.subcategory = "Subcategory is required";
    }
    if (!formData.productName.trim()) {
      newErrors.productName = "Product Name is required";
    }
    if (!formData.productImage) {
      newErrors.productImage = "Product Image is required";
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

  const getSubcategory=()=>{
    axios.get(`${base_url}/api/subcategories/getSubCtegorybyCategoryId/${formData?.category}`)
    .then((resp)=>{
      setSubCategoryOption(resp.data.subCategories)
      console.log(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

useEffect(()=>{
  getCategory()
},[])

useEffect(()=>{
  if(formData.category){
    getSubcategory()
  }
},[formData.category])

 const handleSubmit = (e) => {
  e.preventDefault();

  // Prepare FormData for file upload
  const formDataPayload = new FormData();
  formDataPayload.append("category", formData.category);
  formDataPayload.append("subCategory", formData.subcategory);
  formDataPayload.append("name", formData.productName);
  formDataPayload.append("image", formData.productImage);

  if (validate()) {
    axios.post(`${base_url}/api/products/addproduct`, formDataPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        showSuccessToast('Product Added Successfully');
        navigate('/Products')
        handelClear();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};


  return (
    <div className="mx-4">
      <h2 className="font-semibold text-lg mb-10 text-gray-700">Add Product</h2>

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
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category}</span>
            )}
          </div>

          {/* Subcategory */}
          <div className="relative mb-6">
            <select
              id="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className={`peer w-full border ${errors.subcategory ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 outline-none`}
            >
            <option>Select Category</option>
             {
              subCategoryOption.map((item)=>(
                <option value={item._id}>{item.name}</option>
              ))
             }
            </select>
            <label
              htmlFor="subcategory"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${errors.subcategory ? "text-red-500" : "text-gray-600"}`}
            >
              Subcategory
            </label>
            {errors.subcategory && (
              <span className="text-red-500 text-sm">{errors.subcategory}</span>
            )}
          </div>

          {/* Product Name */}
          <div className="relative mb-6">
            <input
              type="text"
              id="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`peer w-full border ${errors.productName ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-2 outline-none`}
            />
            <label
              htmlFor="productName"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${errors.productName ? "text-red-500" : "text-gray-600"}`}
            >
              Product Name
            </label>
            {errors.productName && (
              <span className="text-red-500 text-sm">{errors.productName}</span>
            )}
          </div>

          {/* Upload File Button */}
          <div className="relative mb-6">
            <button
              type="button"
              onClick={handleFileUpload}
              className={`w-full border px-4 py-3 rounded-lg ${errors.productImage ? "border-red-500" : "border-gray-300"} bg-white text-gray-600 `}
            >
              {formData.productImage ? formData.productImage.name : "Upload File"}
            </button>
            <input
              type="file"
              id="productImageInput"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="productImageInput"
              className={`absolute -top-2 left-3 bg-white px-1 text-sm ${errors.productImage ? "text-red-500" : "text-gray-600"}`}
            >
              Upload Image
            </label>
            {errors.productImage && (
              <span className="text-red-500 text-sm">{errors.productImage}</span>
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

export default AddProduct;
