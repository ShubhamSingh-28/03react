import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Componants/Home.jsx'
import About from './Componants/About.jsx'
import Contact from './Componants/Contact.jsx'
import GitHub from './Componants/Github.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
         path: "",
        element : <Home/>
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "Contact",
        element: <Contact />
      },
      {
        path: "Github",
        element: <GitHub />
      }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
