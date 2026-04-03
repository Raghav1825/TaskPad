import { Outlet } from "react-router-dom"
import NavBar from "./Components/NavBar"
import SideBar from "./Components/SideBar"
function App() {
  
  return (
    <div className="h-screen w-full bg-surface text-on-surface font-sans flex flex-col">
        <NavBar/>
        <div className="flex flex-row flex-1 overflow-hidden">
          <SideBar/>
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet/>
          </main>
        </div>
    </div>
  )
}

export default App
