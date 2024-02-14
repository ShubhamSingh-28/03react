//import { useState } from 'react'
//import React from "react"
import Header from "./Componants/Header"
import Footer from './Componants/Footer'
import { Outlet } from "react-router-dom"

function App() {
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
