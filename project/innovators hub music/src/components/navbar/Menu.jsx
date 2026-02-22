import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContextAPI } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { __AUTH } from "../../backend/FirebaseConfig";
import { signOut } from "firebase/auth";
import UpdateProfile from "../user/UpdateProfile";
import { UserContextAPI } from "../../context/userContext";

const Menu = () => {
  let { authUser } = useContext(AuthContextAPI);
  let { userProfile } = useContext(UserContextAPI);
  let navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(__AUTH);
      toast.success("Logged out");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <aside>
      <ul typeof="none" className="flex gap-4 font-semibold items-center">
        <li>
          <NavLink
            to="/"
            className={(obj) => {
              let { isActive } = obj;
              return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white ${
                isActive && "bg-blue-600"
              }`;
            }}
          >
            Home
          </NavLink>
        </li>

        {userProfile?.role == "admin" && authUser && (
          <li>
            <NavLink
              to="/admin"
              className={(obj) => {
                let { isActive } = obj;
                return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white ${
                  isActive && "bg-blue-600"
                }`;
              }}
            >
              Admin
            </NavLink>
          </li>
        )}
        {authUser ? (
          <>
            <li>
              <button
                className="hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white"
                onClick={logout}
              >
                Logout
              </button>
            </li>
            <li>
              <NavLink to="/user-profile">
                <img
                  src={authUser.photourl}
                  alt=""
                  className="h-[30px] w-[30px] rounded-full"
                />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/auth/login"
                className={(obj) => {
                  let { isActive } = obj;
                  return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white ${
                    isActive && "bg-blue-600"
                  }`;
                }}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/register"
                className={(obj) => {
                  let { isActive } = obj;
                  return `hover:bg-blue-800 py-2 px-4 rounded-lg cursor-pointer text-white ${
                    isActive && "bg-blue-600"
                  }`;
                }}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Menu;