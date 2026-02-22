import React from "react";
import { AiFillPicture } from "react-icons/ai";
import { TbPasswordUser } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import { ImProfile } from "react-icons/im";
import { MdDelete } from "react-icons/md";

const UserSidebar = () => {
  return (
    <div className="text-white h-[100%] w-[20%] bg-black px-4 py-8">
      <ul className="flex flex-col gap-10">
        <li>
          <NavLink
            to="User-Account"
            className={(obj) => {
              let { isActive } = obj;
              return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold {}
                isActive && "bg-blue-600 font-semibold flex items-center gap-2"
              }`;
            }}
          >
            <VscAccount />
            <span>My Account</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="update-password"
            className={(obj) => {
              let { isActive } = obj;
              return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold {}
              isActive && "bg-blue-600 font-semibold flex items-center gap-2"
            }`;
            }}
          >
            <TbPasswordUser />
            <span>UpdatePassword</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="update-picture"
            className={(obj) => {
              let { isActive } = obj;
              return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold {}
                isActive && "bg-blue-600 font-semibold flex items-center gap-2"
              }`;
            }}
          >
            <AiFillPicture />
            <span>Update Picture</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="update-profile"
            className={(obj) => {
              let { isActive } = obj;
              return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold {}
              isActive && "bg-blue-600 font-semibold flex items-center gap-2"
            }`;
            }}
          >
            <ImProfile />
            <span>Update profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="Delete-user"
            className={(obj) => {
              let { isActive } = obj;
              return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold {}
              isActive && "bg-blue-600 font-semibold flex items-center gap-2"
            }`;
            }}
          >
            <MdDelete />
            <span>Delete Account</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
