import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import animationDataLogo from "../../assets/logo.json";
import Lottie from "lottie-react";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('winter');

  const toggleTheme = () => {
    const newTheme = theme === 'winter' ? 'black' : 'winter';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold' : 'hover:text-primary'
          }
        >
          Task
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/taskManage"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold' : 'hover:text-primary'
          }
        >
          Tasks Manage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addTasks"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold' : 'hover:text-primary'
          }
        >
          AddTasks
        </NavLink>
      </li>  
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 ${theme === 'winter' ? 'bg-base-100' : 'bg-black'} shadow-md px-6 md:px-12 py-3 flex justify-between items-center`}
    >

      <Link to="/" className="text-2xl font-bold text-primary flex items-center">
       <div className=" flex items-center justify-center text-2xl font-bold">
            <div className="w-12 h-12">
              <Lottie animationData={animationDataLogo}></Lottie>
            </div>
            <h2>Job Task</h2>
          </div>
      </Link>

      <ul className="hidden md:flex space-x-6 list-none">{links}</ul>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-200 shadow-lg rounded-md p-4 md:hidden z-40">
          <ul className="space-y-3">{links}</ul>
        </div>
      )}

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="hidden md:block text-sm text-black dark:text-gray-300">
              {user.displayName}
            </div>
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} alt="User Profile" />
              </div>
            </div>
            <button
              onClick={logOut}
              className="btn btn-error btn-sm text-white rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary btn-sm text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm text-white">
              SignUp
            </Link>
          </>
        )}

        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-sm flex items-center"
        >
          {theme === 'winter' ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      <button
        className="md:hidden text-3xl focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );
};

export default Navbar;
