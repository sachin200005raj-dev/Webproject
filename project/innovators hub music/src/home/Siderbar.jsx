import React from 'react'
import { MdPhotoAlbum } from 'react-icons/md';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className=" bg-black py-8 px-4 h-[calc(100vh-70px)] w-[20%] sticky top-[70px] shrink-0">
              <ul>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white flex items-center gap-2 w-[100%] text-lg ${
                        isActive && "bg-blue-600"
                      }`
                    }
                  >
                   <MdPhotoAlbum /> <span>Dashboard</span>
                  </NavLink>
                </li>
              </ul>
            </div>
  )
}

export default Sidebar