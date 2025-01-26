import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Products from "./pages/Products";
import HomePage from "./pages/HomePage";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";
import Dashboard from "./components/Dashboard";
import AddCategory from "./components/AddCategory";
import EditCategory from "./components/EditCategory";
import AddSubcategory from "./components/AddSubcategory";
import EditSubcategory from "./components/EditSubcategory";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

const AllRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/AddProduct" element={<AddProduct />} />
      <Route path="/EditProduct/:id" element={<EditProduct />} />
      <Route path="/HomePage" element={<HomePage/>}/>
      <Route path="/Category" element={<Category/>}/>
      <Route path="/AddCategory" element={<AddCategory/>}/>
      <Route path="/EditCategory/:id" element={<EditCategory/>}/>
      <Route path="/Subcategory" element={<Subcategory/>}/>
      <Route path="/AddSubcategory" element={<AddSubcategory/>}/>
      <Route path="/EditSubcategory/:id" element={<EditSubcategory/>}/>
    </Routes>
  );
};

export default AllRouter;
