import React from 'react'
import { Outlet } from 'react-router-dom'

const OtherLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default OtherLayout