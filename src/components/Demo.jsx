import React from "react";
import Table from "./Table";

const Demo = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "categoryName", label: "Category Name" },
    { key: "image", label: "Image" },
    { key: "status", label: "Status" },
    { key: "sequence", label: "Sequence" },
    { key: "action", label: "Action" },
  ];

  const data = [
    {
      id: 1,
      categoryName: "Electronics",
      image: "https://via.placeholder.com/50",
      status: "Active",
      sequence: 1,
      action: "Edit",
    },
    {
      id: 2,
      categoryName: "Clothing",
      image: "https://via.placeholder.com/50",
      status: "Inactive",
      sequence: 2,
      action: "Edit",
    },
    {
      id: 3,
      categoryName: "Furniture",
      image: "https://via.placeholder.com/50",
      status: "Active",
      sequence: 3,
      action: "Edit",
    },
    {
      id: 4,
      categoryName: "Books",
      image: "https://via.placeholder.com/50",
      status: "Inactive",
      sequence: 4,
      action: "Edit",
    },
    {
      id: 5,
      categoryName: "Toys",
      image: "https://via.placeholder.com/50",
      status: "Active",
      sequence: 5,
      action: "Edit",
    },
    {
      id: 6,
      categoryName: "Sports",
      image: "https://via.placeholder.com/50",
      status: "Inactive",
      sequence: 6,
      action: "Edit",
    },
    {
      id: 7,
      categoryName: "Music",
      image: "https://via.placeholder.com/50",
      status: "Active",
      sequence: 7,
      action: "Edit",
    },
    {
      id: 8,
      categoryName: "Automobile",
      image: "https://via.placeholder.com/50",
      status: "Inactive",
      sequence: 8,
      action: "Edit",
    },
  ];

  return (
    <div className="py-8 px-2">
      <Table columns={columns} data={data} rowsPerPage={3} />
    </div>
  );
};

export default Demo;
