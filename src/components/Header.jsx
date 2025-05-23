import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa6";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import Logout from "../utils/Logout";
import { fetchUserDetails } from "../store/slices/authSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  MdBook,
  MdBuild,
  MdClose,
  MdHome,
  MdHomeFilled,
  MdLeaderboard,
  MdLogout,
  MdPerson2,
  MdSettings,
  MdUploadFile,
} from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { toast } from "react-toastify";

const Header = () => {
  const { user, isLoading, error } = useSelector((state) => state?.auth);
  const [ismenuOpen, setIsMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const prevScrollPos = useRef(window.scrollY);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails());
    }

    document.addEventListener("click", (e) => {
      if (e.target.closest(".user")) return;
      setIsMenuOpen(false);
    });
  }, [token, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShowNavbar(
        prevScrollPos.current > currentScrollPos || currentScrollPos < 10
      );
      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!ismenuOpen);
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        position: "top-right",
      });
    }
  }, [error]);

  return (
    <header
      className={`flex justify-between items-center p-2 sticky w-full bg-white shadow z-10 transition-all duration-300 ${
        showNavbar ? "top-0" : "-top-16"
      }`}
    >
      <div className="center gap-3">
        <div className="flex items-center cursor-pointer md:hidden">
          <HiMiniBars3BottomLeft size={24} onClick={handleToggleNav} />
        </div>

        <div
          className="logo center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-8 block" />
          <h2 className="text-2xl font-bold text-blue-500">
            <span className="text-black">Edu</span>Docs
          </h2>
        </div>
      </div>
      <div className="center gap-4">
        <nav
          className={`navbar fixed top-0 left-0 h-dvh w-80 ${
            isNavOpen ? "-translate-x-0" : "-translate-x-full"
          } overflow-hidden bg-white md:relative md:w-fit md:top-0 md:h-fit z-10 transitions duration-100 ease-in-out transition-transform-full md:translate-x-0`}
        >
          <div className="flex p-2 items-center cursor-pointer md:hidden border-b">
            <div className="close-btn bg-gray-100 hover:bg-gray-200 p-2 rounded">
              <MdClose size={24} onClick={() => setIsNavOpen(false)} />
            </div>
            <div
              className="logo center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="logo" className="h-8 block" />
              <h2 className="text-2xl font-bold text-blue-500">
                <span className="text-black">Edu</span>Docs
              </h2>
            </div>
          </div>
          {token && (
            <div
              className="user block md:hidden cursor-default flex items-center gap-2 m-2 p-2 border hover:shadow rounded cursor-pointer"
              onClick={() => {
                navigate(`/profile/${user.username}`);
                setIsNavOpen(false);
              }}
            >
              <div className="user-avatar">
                {!isLoading && !error ? (
                  <div className="mx-1 h-10 w-10 text-white font-semibold bg-blue-500 rounded center">
                    <span>{user?.firstName.charAt(0)}</span>
                    <span>{user?.lastName.charAt(0)}</span>
                  </div>
                ) : (
                  <Skeleton className="mx-1 h-10 w-10 rounded" />
                )}
              </div>
              <div className="username">
                {!isLoading && !error ? (
                  <p className="text-gray-600 font-semibold">
                    {user?.firstName} {user?.lastName}
                  </p>
                ) : (
                  <Skeleton className="h-4 w-24" />
                )}
              </div>
            </div>
          )}
          <ul className="flex flex-col md:flex-row md:items-center md:gap-2 px-2 md:mt-0 mt-4 ">
            <li
              className="list-items hover:bg-gray-200 rounded"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
              >
                <span className="block md:hidden">
                  <MdHome size={24} className="me-2" />
                </span>
                Home
              </NavLink>
            </li>
            <li
              className="list-items hover:bg-gray-200 rounded"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/books"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800 "
              >
                <span className="block  md:hidden">
                  <MdBook size={24} className="me-2" />
                </span>
                Books
              </NavLink>
            </li>
            <li
              className="list-items hover:bg-gray-200 rounded"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/solve-doubt"
                className="nav-link flex items-center  p-3 md:p-2 text-gray-800"
              >
                <span className="block md:hidden">
                  <FaRobot size={24} className="me-2" />
                </span>
                Ask AI
              </NavLink>
            </li>

            <li
              className="list-items hover:bg-gray-200 rounded"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/tools"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
              >
                <span className="block md:hidden">
                  <MdBuild size={24} className="me-2" />
                </span>
                Tools
              </NavLink>
            </li>

            <li
              className="list-items hover:bg-gray-200 rounded"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/leaderboard"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
              >
                <span className="block md:hidden">
                  <MdLeaderboard size={24} className="me-2" />
                </span>
                Leaderboard
              </NavLink>
            </li>

            <li className="list-items hover:bg-gray-200 rounded md:hidden">
              <NavLink
                to={`${token ? `/profile/${user?.username}` : "/signin"}`}
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block md:hidden">
                  <MdPerson2 size={24} className="me-2" />
                </span>
                Profile
              </NavLink>
            </li>

            <li className="list-items  hover:bg-gray-200 rounded md:hidden">
              <NavLink
                to={`${token ? "uploads" : "/signin"}`}
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block md:hidden">
                  <MdUploadFile size={24} className="me-2" />
                </span>
                Uploads
              </NavLink>
            </li>

            <li className="list-items hover:bg-gray-200 rounded md:hidden">
              <NavLink
                to={`${token ? "/settings" : "/signin"}`}
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block md:hidden">
                  <MdSettings size={24} className="me-2" />
                </span>
                Settings
              </NavLink>
            </li>
          </ul>
          <div className="navbar-btns md:hidden absolute bottom-0 border-t border-gray-400 w-full">
            {token ? (
              <button
                className="text-center font-semibold flex items-center p-3 w-full"
                onClick={() => {
                  Logout({ dispatch, navigate });
                  setIsNavOpen(false);
                }}
              >
                <IoMdLogOut size={24} className="me-2" />
                Sign out
              </button>
            ) : (
              <NavLink
                to="/signin"
                className="text-center flex items-center p-3 md:p-2 text-gray-800"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <IoMdLogIn size={24} className="me-2" />
                Sign in
              </NavLink>
            )}
          </div>
        </nav>

        {token && (
          <div className="user relative">
            {!isLoading && !error ? (
              <div
                className="user-name flex items-center cursor-pointer"
                onClick={toggleMenu}
              >
                <div className="mx-1 h-10 w-10 text-white font-semibold bg-blue-500 rounded-xl center hover:bg-blue-600 hover:ring-2">
                  <span>{user?.firstName.charAt(0)}</span>
                  <span>{user?.lastName.charAt(0)}</span>
                </div>
              </div>
            ) : (
              <Skeleton className="mx-1 h-10 w-10 rounded-xl" />
            )}

            {ismenuOpen && (
              <div className="user-menu absolute top-12 right-0 bg-white rounded ring-2 ring-gray-200 w-48 z-10">
                <ul className="menu-list p-4">
                  <li className="menu-list">
                    <NavLink
                      to="/"
                      className="menu-link rounded mb-1 text-center flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdHomeFilled size={20} className="m-2" />
                      Home
                    </NavLink>
                  </li>
                  <li className="menu-list">
                    <NavLink
                      to={`/profile/${user.username}`}
                      className="menu-link rounded mb-1 text-center flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdPerson2 size={20} className="m-2" />
                      Profile
                    </NavLink>
                  </li>
                  <li className="menu-list">
                    <NavLink
                      to="/uploads"
                      className="menu-link rounded mb-1 text-center flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdUploadFile size={20} className="m-2" />
                      Uploads
                    </NavLink>
                  </li>
                  <li className="menu-list">
                    <NavLink
                      to="/settings"
                      className="menu-link rounded mb-1 text-center flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdSettings size={20} className="m-2" />
                      Settings
                    </NavLink>
                  </li>
                  <li className="menu-list">
                    <button
                      className="w-full text-center flex items-center menu-link rounded mb-1 text-center flex items-center hover:bg-red-600 hover:text-white transition-colors"
                      onClick={() => {
                        Logout({ dispatch, navigate });
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdLogout size={20} className="m-2" />
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {!token && (
          <div className="header-btns">
            <NavLink
              to="/signin"
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Sign in
            </NavLink>
          </div>
        )}
      </div>

      <div
        className={`navbar-overlay fixed left-0 top-0 h-screen w-full ${
          isNavOpen ? "block" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={() => setIsNavOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
