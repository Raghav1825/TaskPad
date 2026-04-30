import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./chartSetup";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Home from './Components/Home/Home.jsx'
import Project from './Components/Projects/Projects.jsx'
import DailyTask from './Components/DailyTask/DailyTask.jsx';
import Settings from './Components/Settings/Settings.jsx';
import MainBoard from './Components/Board/MainBoard.jsx';

const router= createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"projects",
          element:<Project/>,
        },
        {
          path:"dailytask",
          element:<DailyTask/>
        },
        {
          path:"settings",
          element:<Settings/>
        },
        {
          path:"projects/:projectId",
          element:<MainBoard/>
        }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
)
