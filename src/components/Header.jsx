import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa6";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Logout from "../utils/Logout";
import { fetchUserDetails } from "../store/slices/authSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  MdBook,
  MdClose,
  MdHome,
  MdHomeFilled,
  MdLogout,
  MdPerson2,
  MdSettings,
  MdUploadFile,
} from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { user, isLoading } = useSelector((state) => state?.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header
      className={`flex justify-between items-center p-2 fixed w-full bg-white z-10 transition-shadow duration-300 ${
        hasShadow ? "border-b" : ""
      }`}
    >
      <div className="center gap-3">
        <div className="flex items-center cursor-pointer sm:hidden">
          <HiMiniBars3BottomLeft size={24} onClick={handleToggleNav} />
        </div>

        <div className="logo">
          <NavLink to="/" className="center">
            <img src={logo} alt="logo" className="h-8 block" />
            <h2 className="text-2xl font-bold text-blue-500">
              <span className="text-black">Edu</span>Docs
            </h2>
          </NavLink>
        </div>
      </div>
      <div className="center gap-4">
        <nav
          className={`navbar absolute top-0 left-0 h-screen w-80 ${
            isNavOpen ? "-translate-x-0" : "-translate-x-full"
          } overflow-hidden bg-white sm:relative sm:w-fit sm:top-0 sm:h-fit z-10 transitions duration-100 ease-in-out transition-transform-full sm:translate-x-0`}
        >
          <div className="flex gap-4 p-2 items-center cursor-pointer sm:hidden border-b">
            <div className="close-btn bg-gray-100 hover:bg-gray-200 p-2 rounded">
              <MdClose size={24} onClick={() => setIsNavOpen(false)} />
            </div>
            <div className="logo">
              <NavLink to="/" className="flex items-center">
                <img src={logo} alt="logo" className="h-8 block" />
                <h2 className="text-2xl font-bold text-blue-500">
                  <span className="text-black">Edu</span>Docs
                </h2>
              </NavLink>
            </div>
          </div>
          <ul className="flex flex-col sm:flex-row sm:items-center sm:gap-2 px-2 mt-8 sm:mt-0 ">
            <li
              className="list-items hover:bg-gray-200 rounded"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink to="/" className="flex items-center text- p-2 text-gray-700">
                <span className="block sm:hidden">
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
                className="flex items-center text- p-2 text-gray-700 "
              >
                <span className="block  sm:hidden">
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
                className="flex items-center text- p-2 text-gray-700"
              >
                <span className="block sm:hidden">
                  <FaRobot size={24} className="me-2" />
                </span>
                Ask AI
              </NavLink>
            </li>

            <li className="list-items hover:bg-gray-200 rounded sm:hidden">
              <NavLink
                to={`${token ? `/profile/${user?.username}` : "/signin"}`}
                className="flex items-center text- p-2 text-gray-700"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block sm:hidden">
                  <MdPerson2 size={24} className="me-2" />
                </span>
                Profile
              </NavLink>
            </li>

            <li className="list-items  hover:bg-gray-200 rounded sm:hidden">
              <NavLink
                to={`${token ? "uploads" : "/signin"}`}
                className="flex items-center text- p-2 text-gray-700"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block sm:hidden">
                  <MdUploadFile size={24} className="me-2" />
                </span>
                Uploads
              </NavLink>
            </li>

            <li className="list-items hover:bg-gray-200 rounded sm:hidden">
              <NavLink
                to={`${token ? "/settings" : "/signin"}`}
                className="flex items-center text- p-2 text-gray-700"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block sm:hidden">
                  <MdSettings size={24} className="me-2" />
                </span>
                Settings
              </NavLink>
            </li>

            <li
              className="list-items sm:hidden absolute bottom-0 left-auto w-full border-t border-gray-200"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <button
                className="flex items-center w-full py-2 text-red-600"
                onClick={() => {
                  Logout({ dispatch, navigate });
                  setIsMenuOpen(false);
                }}
              >
                <MdLogout size={20} className="m-2 sm:hidden" />
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {token && (
          <div className="user relative">
            <div
              className="user-name flex items-center cursor-pointer"
              onClick={toggleMenu}
            >
              {!isLoading ? (
                <div className="mx-1 h-10 w-10 text-white font-semibold bg-blue-500 rounded center hover:bg-blue-600 hover:ring-2">
                  <span>{user?.firstName.charAt(0)}</span>
                  <span>{user?.lastName.charAt(0)}</span>
                </div>
              ) : (
                <Skeleton className="mx-1 h-10 w-10 rounded" />
              )}
            </div>

            {isMenuOpen && (
              <div className="user-menu absolute top-11 right-0 bg-white rounded ring-2  ring-gray-200 w-64 z-10">
                <ul className="menu-list p-4">
                  <li className="text-gray-600 rounded px-2 hover:bg-blue-600 hover:text-white transition-colors">
                    <NavLink
                      to="/"
                      className="block py-1 flex items-center "
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdHomeFilled size={20} className="m-2" />
                      Home
                    </NavLink>
                  </li>
                  <li className="text-gray-600 rounded px-2  hover:bg-blue-600 hover:text-white transition-colors">
                    <NavLink
                      to={`/profile/${user.username}`}
                      className="block py-1 flex items-center"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdPerson2 size={20} className="m-2" />
                      Profile
                    </NavLink>
                  </li>
                  <li className="text-gray-600 rounded px-2  hover:bg-blue-600 hover:text-white transition-colors">
                    <NavLink
                      to="/uploads"
                      className="block py-1 flex items-center "
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdUploadFile size={20} className="m-2" />
                      Uploads
                    </NavLink>
                  </li>
                  <li className="text-gray-600 rounded px-2  hover:bg-blue-600 hover:text-white transition-colors">
                    <NavLink
                      to="/settings"
                      className="block py-1 flex items-center "
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdSettings size={20} className="m-2" />
                      Settings
                    </NavLink>
                  </li>
                  <li className="text-gray-600 rounded mt-1 px-2 hover:bg-red-600 hover:text-white transition-colors border-t border-gray-200">
                    <button
                      className="block py-1 flex items-center"
                      onClick={() => {
                        Logout({ dispatch, navigate });
                        setIsMenuOpen(false);
                      }}
                    >
                      <MdLogout size={20} className="m-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {!token && (
          <div className="header-btns flex gap-2">
            <NavLink
              to="/signin"
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Signin
            </NavLink>
          </div>
        )}
      </div>

      <div
        className={`navbar-overlay absolute left-0 top-0 h-screen w-full ${
          isNavOpen ? "block" : "hidden"
        }`}
        style={{backgroundColor:"rgba(0,0,0,0.4)"}}
        onClick={() => setIsNavOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
