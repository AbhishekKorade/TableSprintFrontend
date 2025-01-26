import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { base_url } from "../config/base_url";
import { showSuccessToast } from "./Toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    name: "",
    status: "",
    image: null,
  });

  // Fetch product data
  const getSingleProduct = () => {
    axios
      .get(`${base_url}/api/products/getProductById/${id}`)
      .then((resp) => {
        const { category, subCategory, name, status, image } = resp.data.product;
        setFormData({
          category: category?._id || "",
          subCategory: subCategory?._id || "",
          name: name || "",
          status: status || "",
          image: null, // Image should be uploaded manually
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileUpload = () => {
    document.getElementById("categoryImageInput").click();
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = new FormData();
    updatedProduct.append("category", formData.category);
    updatedProduct.append("subCategory", formData.subCategory);
    updatedProduct.append("name", formData.name);
    updatedProduct.append("status", formData.status);
    if (formData.image) {
      updatedProduct.append("image", formData.image);
    }

    axios
      .put(`${base_url}/api/products/updateProduct/${id}`, updatedProduct)
      .then((resp) => {
        showSuccessToast("Product updated successfully");
         navigate("/Products");
      })
      .catch((err) => {
        console.error("Error updating product:", err);
      });
  };

  return (
    <div className="mx-4">
      <h2 className="font-semibold text-lg mb-10 text-gray-700">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-2">
          {/* Category */}
          <div className="relative mb-6">
            <select
              id="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            >
              <option value="">Select Category</option>
              {/* Add dynamic category options */}
            </select>
            <label
              htmlFor="Category"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
            >
              Category
            </label>
          </div>

          {/* Subcategory */}
          <div className="relative mb-6">
            <select
              id="Subcategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            >
              <option value="">Select Subcategory</option>
              {/* Add dynamic subcategory options */}
            </select>
            <label
              htmlFor="Subcategory"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
            >
              Subcategory
            </label>
          </div>

          {/* Product Name */}
          <div className="relative mb-6">
            <input
              type="text"
              id="ProductName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            />
            <label
              htmlFor="ProductName"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
            >
              Product Name
            </label>
          </div>

          {/* Status */}
          <div className="relative mb-6">
            <select
              id="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <label
              htmlFor="Status"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-600 "
            >
              Upload File
            </button>
            <input
              type="file"
              id="categoryImageInput"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="categoryImageInput"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
            >
              Upload Image
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end items-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-6 py-2 border border-gray-300 cursor-pointer rounded-full text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#662671] text-white rounded-full cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
