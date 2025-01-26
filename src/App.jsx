
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import { getUser } from "./Redux/fetures/productSlice";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter } from "react-router-dom";
import AllRouter from "./AllRouter";
import Login from "./components/Login";
import Toast from "./components/Toast";

function App() {
  const { user } = useSelector((state) => state.user);
  // const [userlogin, setUserLogin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add state for mobile sidebar
  const dispatch = useDispatch();
const userlogin = localStorage.getItem('isLogin')

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div>
          {userlogin ? (
            <>
              <Navbar />
              {/* For mobile screens, toggle sidebar on hover */}
              <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
              <div className="mt-[80px] ml-[310px]">
                <AllRouter />
                <Toast />
              </div>
            </>
          ) : (
            <>
            <Login />
            <Toast />
            </>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
