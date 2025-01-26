import React, { useState } from 'react';
import Dashboard from '../assets/images/SidebarIcons/Dashboard.svg';
import Category from '../assets/images/SidebarIcons/Category.svg';
import Subcategory from '../assets/images/SidebarIcons/Subcategory.svg';
import Products from '../assets/images/SidebarIcons/Products.svg';
import Arrow from '../assets/images/SidebarIcons/Arrow.svg';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActiveComponent }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate=useNavigate()

  const menu = [
    {
      title: "Dashboard",
      image: Dashboard,
      component: "Dashboard",
      link:"Dashboard"
    },
    {
      title: "Category",
      image: Category,
      component: "Category",
      link:"Category"
    },
    {
      title: "Subcategory",
      image: Subcategory,
      component: "Subcategory",
       link:"Subcategory",
    },
    {
      title: "Products",
      image: Products,
      component: "Products",
       link:"Products",
    },
  ];

  return (
    <div className="w-75 bg-[#F4F4F4] h-screen p-4 fixed top-[70px] left-0">
      {menu.map((item, i) => (
        <div
          key={i}
          className={`flex justify-between items-center p-3 rounded-md cursor-pointer ${
            hoveredIndex === i ? "bg-[#F4EDAF]" : "bg-transparent"
          }`}
          onMouseEnter={() => setHoveredIndex(i)} // Set hovered index
          onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
          onClick={() => {
            // setActiveComponent(item.component)
            navigate(`/${item.link}`)
          }} 
        >
          <div className="flex gap-2 items-center">
            <img src={item.image} alt={item.title} className="w-6 h-6" />
            <span
              className={`text-sm `}
            >
              {item.title}
            </span>
          </div>
          <div>
            <img
              src={Arrow}
              alt="Arrow Icon"
              className={`w-4 h-4 transition-transform`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;


// import React, { useState } from 'react';
// import Dashboard from '../assets/images/SidebarIcons/Dashboard.svg';
// import Category from '../assets/images/SidebarIcons/Category.svg';
// import Subcategory from '../assets/images/SidebarIcons/Subcategory.svg';
// import Products from '../assets/images/SidebarIcons/Products.svg';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const navigate = useNavigate();

//   const menu = [
//     {
//       title: "Dashboard",
//       image: Dashboard,
//       link: "Dashboard",
//     },
//     {
//       title: "Category",
//       image: Category,
//       link: "Category",
//     },
//     {
//       title: "Subcategory",
//       image: Subcategory,
//       link: "Subcategory",
//     },
//     {
//       title: "Products",
//       image: Products,
//       link: "Products",
//     },
//   ];

//   return (
//     <div
//       className={`fixed top-[70px] left-0 bg-[#F4F4F4] h-screen p-4 transition-all duration-300
//         ${isOpen ? "w-64" : "w-20"} sm:w-64`} // Fixed sidebar width based on state (collapsed/expanded)
//       onMouseEnter={() => setIsSidebarOpen(true)} // Expand sidebar on hover
//       onMouseLeave={() => setIsSidebarOpen(false)} // Collapse sidebar when mouse leaves
//     >
//       {menu.map((item, i) => (
//         <div
//           key={i}
//           className={`flex justify-between items-center p-3 rounded-md cursor-pointer mb-3
//             ${hoveredIndex === i ? "bg-[#F4EDAF]" : "bg-transparent"}
//             ${isOpen ? "w-full" : "w-20"}`} // Adjust width based on the state of the sidebar
//           onMouseEnter={() => setHoveredIndex(i)} // Set hovered index for styling
//           onClick={() => navigate(`/${item.link}`)}
//         >
//           <div className="flex gap-2 items-center mx-2"> {/* Margin for spacing */}
//             <img src={item.image} alt={item.title} className="w-6 h-6" />
//             {isOpen && ( // Show label only when sidebar is open
//               <span className="text-sm">{item.title}</span>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;
