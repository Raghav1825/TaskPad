import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./chartSetup";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Home from './Components/Home/Home.jsx'
import Project from './Components/Projects/Projects.jsx'

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
          element:<Project/>
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
