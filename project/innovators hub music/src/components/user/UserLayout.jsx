import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidear from './UserSidear'

const UserLayout = () => {
  return (
    <div className='flex bg-slate-900 h-[calc(100vh-70px)]'>
        <UserSidear/>
        <Outlet/>
    </div>
  )
}

export default UserLayout