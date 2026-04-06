import { Outlet } from "react-router-dom"
import NavBar from "./Components/NavBar"
import SideBar from "./Components/SideBar"
import { useState } from "react"
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
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
