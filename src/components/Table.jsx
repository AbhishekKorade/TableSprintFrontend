import React, { useState } from "react";
import EditIcon from '../assets/images/EditIcon.svg'
import ViewIcon from '../assets/images/ViewIcon.svg'
import DeleteIcon from '../assets/images/DeleteIcon.svg'
import { useNavigate } from "react-router-dom";

const Table = ({ columns, data, rowsPerPage = 5,link ,handleModal,deleteIddata}) => {
console.log(link,"////data")
  const navigate=useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data
    .filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Sorting logic
  const sortedData = paginatedData.sort((a, b) => {
    if (!sortConfig.key) return 0;
    const key = sortConfig.key;
    if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction: prevState.key === key && prevState.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when a new search is made
  };

  // Actions for Edit and Delete
  const handleEdit = (id) => {
    console.log("Editing item with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Deleting item with id:", id);
  };

  return (
    <div>
 

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-[#FFF8B7] text-left">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}{" "}
                  {sortConfig.key === col.key &&
                    (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm">
                    {col.key === "image" ? (
                      <img
                        src={row[col.key]}
                        alt={row.categoryName}
                        className="w-12 h-12"
                      />
                    ) : col.key === "action" ? (
                      // Action column with icons
                      <div className="flex space-x-3">
                        <button
                          onClick={() =>{ 
                            navigate(`/${link[0]?.edit}/${row._id}`)
                          }}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        >
                            <img src={EditIcon} alt="" className=" h-[20px] w-[20px]"/>
                        </button>
                      
                        <button
                          onClick={() =>{
                            deleteIddata(row._id)
                            handleModal(true)
                          }}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                            <img src={DeleteIcon} alt="" className=" h-[20px] w-[20px]"/>
                        </button>
                        {/* <button
                          onClick={() => handleDelete(row.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                            <img src={ViewIcon} alt="" className=" h-[25px] w-[25px]"/>
                        </button> */}
                      </div>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#662671] text-white"
          }`}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#662671] text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
