import React from "react";
import { useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Call logout API
      const response = await fetch("http://localhost:7777/logout", {
        method: "GET",
        credentials: 'include',
      });

      if (response.ok) {
        // Remove user from Redux state
        dispatch(removeUser());
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still remove user from Redux even if API call fails
      dispatch(removeUser());
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl ml-10">DevTinder</a>
      </div>
      <div className="flex gap-2 mr-10">
        {user ? (
          <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              {/* <a className="justify-between">
                Profile
              </a> */}
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              {/* <a>Logout</a> */}
              <Link to="/login" onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
