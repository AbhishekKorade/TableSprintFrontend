import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base_url } from "../config/base_url";
import { showSuccessToast } from "./Toast";

const EditSubcategory = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const [categoryOption, setCategoryOption] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [sequence, setSequence] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    category: '',
    subcategory: '',
    sequence: '',
    status: '',
  });

  const handleFileUpload = () => {
    document.getElementById("categoryImageInput").click();
  };

  const getSingleSubcategory = () => {
    axios
      .get(`${base_url}/api/subcategories/getbySubcategoryId/${id}`)
      .then((resp) => {
        setCategory(resp.data.subCategory.category._id);
        setSubcategory(resp.data.subCategory.name);
        setSequence(resp.data.subCategory.sequence);
        setStatus(resp.data.subCategory.status);
        setImage(resp.data.subCategory.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = () => {
    axios
      .get(`${base_url}/api/categories/getAllCategory`)
      .then((resp) => {
        setCategoryOption(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Validation checks for each field
    if (!category) {
      errors.category = "Category is required!";
      valid = false;
    }
    if (!subcategory) {
      errors.subcategory = "Subcategory Name is required!";
      valid = false;
    }
    if (!sequence || isNaN(sequence)) {
      errors.sequence = "Subcategory Sequence must be a number!";
      valid = false;
    }
    if (!status) {
      errors.status = "Status is required!";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    const formData = new FormData();
    formData.append("name", subcategory);
    formData.append("category", category);
    formData.append("sequence", sequence);
    formData.append("status", status);
    if (image) formData.append("image", image);

    axios
      .put(`${base_url}/api/subcategories/updateSubcategory/${id}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data', 
        }
      })
      .then((resp) => {
        showSuccessToast("Subcategory updated successfully!");
      })
      .catch((err) => {
        console.log(err);
        navigate('/Subcategory')
        alert("Error updating subcategory.");
      });
  };

  useEffect(() => {
    getCategory();
    getSingleSubcategory();
  }, []);

  return (
    <div className="mx-4">
      <h2 className="font-semibold text-lg mb-10 text-gray-700">Edit Subcategory</h2>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-3 gap-2">

          {/* Category */}
          <div className="relative mb-6">
            <select
              id="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            >
              <option value="">Select Category</option>
              {categoryOption.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="Category"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
            >
              Category
            </label>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Subcategory Name */}
          <div className="relative mb-6">
            <input
              type="text"
              id="SubCategoryName"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            />
            <label
              htmlFor="SubCategoryName"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
            >
              Subcategory Name
            </label>
            {errors.subcategory && (
              <p className="text-red-600 text-sm mt-1">{errors.subcategory}</p>
            )}
          </div>

          {/* Subcategory Sequence */}
          <div className="relative mb-6">
            <input
              type="number"
              id="categorySequence"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            />
            <label
              htmlFor="categorySequence"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
            >
              Subcategory Sequence
            </label>
            {errors.sequence && (
              <p className="text-red-600 text-sm mt-1">{errors.sequence}</p>
            )}
          </div>

          {/* Status */}
          <div className="relative mb-6">
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <label
              htmlFor="status"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600"
            >
              Status
            </label>
            {errors.status && (
              <p className="text-red-600 text-sm mt-1">{errors.status}</p>
            )}
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
              onChange={(e) => setImage(e.target.files[0])}
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
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#662671] text-white rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubcategory;
