import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { getUser } from "../Redux/fetures/productSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Products from "./Products";

function HomePage() {
  const [activeComponent, setActiveComponent] = useState("Demo");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //  const stateId = "67404fae64299a4dfce453d6"

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Products":
        return <Products />;
      case "Dashboard":
        return <Dashboard />;
      default:
        return <Dashboard />; 
    }
  };
  

  return (
    <>
    {/* <BrowserRouter> */}
      <div>
        <Navbar />
    
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className=" mt-[200px] ml-[310px] ">{renderComponent()}</div>
      </div>
      {/* </BrowserRouter> */}
    </>
  );
}

export default HomePage;
