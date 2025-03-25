import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "./MainLayout.css"

const MainLayout = () => {
  return (
    <div className='main-container'>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
    
  )
}

export default MainLayout

