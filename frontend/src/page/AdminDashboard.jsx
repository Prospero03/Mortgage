import React from 'react'
import Sidebar from '../components/Admin Components/Sidebar'
import { Outlet } from 'react-router-dom'
import "./AdminDashboard.css"

const AdminDashboard = () => {
  return (
    <div>
      
      <h1>Панель Администратора</h1>
      <div><Sidebar/></div>
      <div><Outlet/></div>
    </div>
  )
}

export default AdminDashboard