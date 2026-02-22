import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className=' text-white h-[calc(100vh-70px)] w-[18%] bg-black px-4 py-8  shrink-0 sticky top-[70px] '>
                                   
    <ul className='flex flex-col gap-4'>
        <li>
            <NavLink to="/admin" 
            end
            className={(obj) => {
        let { isActive } = obj;
        return `w-[100%] flex items-center gap-2 py-2  hover:bg-blue-800 px-4 rounded-lg font-semibold  ${
          isActive && "bg-blue-600"
        }`; 
      }}  >
            
            <span>Dashboard</span>
            
            </NavLink>
        </li>
        <li>
            <NavLink to="/admin/add-album" 
            end
            className={(obj) => {
        let { isActive } = obj;
        return `w-[100%] flex items-center gap-2 py-2  hover:bg-blue-800 px-4 rounded-lg font-semibold  ${
          isActive && "bg-blue-600"
        }`; 
      }}  >
            
            <span>add-album</span>
            
            </NavLink>
        </li>
       
    </ul>
</div>
  )
}

export default AdminSidebar