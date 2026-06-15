import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import { useState,useEffect } from "react";
import api from "./api/apiClient";
import { useTheme } from "./context/ThemeContext";
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  const {getTheme}=useTheme();
  useEffect(()=>{
    const checkAuth = async()=>{
      try {
        const response = await api.get("/users/current-user");
        if(response){
          setIsLoggedIn(true);
          await getTheme();
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  },[])

  return (
    <div className="h-screen w-full bg-surface text-on-surface font-sans flex flex-col">
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div className="flex flex-row flex-1 overflow-hidden">
          <SideBar/>
          <main className="flex flex-1 overflow-y-auto p-2">
            <Outlet context={{ isLoggedIn }}/>
          </main>
        </div>
    </div>
  )
}

export default App
