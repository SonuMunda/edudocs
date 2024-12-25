import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { SiChatbot } from "react-icons/si";
import { FaAngleDown, FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Logout from "../utils/Logout";
import FetchUserId from "../utils/FetchUserId";
import { fetchUserDetails } from "../store/slices/userSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  MdBook,
  MdHomeFilled,
  MdLogout,
  MdPerson2,
  MdSettings,
  MdUploadFile,
} from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { user, isLoading } = useSelector((state) => state?.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const id = FetchUserId();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails({ id }));
    }

    document.addEventListener("click", (e) => {
      if (e.target.closest(".user")) return;
      setIsMenuOpen(false);
    });
  }, [token, dispatch, id]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="flex justify-between items-center shadow  p-2 sm:px-10 fixed w-full bg-white  z-10">
      <div className="center gap-2">
        {token && (
          <div className="menubar sm:hidden" onClick={handleToggleNav}>
            <FaBars size={24} />
          </div>
        )}
        <div className="logo">
          <NavLink to="/" className="center">
            <img src={logo} alt="logo" className="h-8" />
            <h1 className="text-xl font-semibold">EduDocs</h1>
          </NavLink>
        </div>
      </div>

      <div className="header-btns flex gap-2">
        {!token ? (
          <>
            <NavLink
              to="/login"
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Login
            </NavLink>

            <NavLink to="/signup" className="bg-gray-200 py-2 px-4 rounded">
              Signup
            </NavLink>
          </>
        ) : (
          <div className="center gap-4">
            <nav
              className={`navbar absolute top-14 left-0 h-screen ${
                isNavOpen ? "w-80" : "w-0"
              } overflow-hidden bg-gray-100 sm:relative sm:w-fit sm:top-0 sm:h-fit sm:bg-white z-10 transitions duration-100  ease-in-out`}
            >
              <ul className="flex flex-col sm:flex-row sm:items-center gap-6 p-8 sm:p-0 ">
                <li
                  className="list-items"
                  onClick={() => {
                    setIsNavOpen(false);
                  }}
                >
                  <NavLink to="/" className="text-gray-600  flex items-center">
                    <span className="block sm:hidden">
                      <MdHomeFilled size={20} className="me-2" />
                    </span>
                    Home
                  </NavLink>
                </li>
                <li
                  className="list-items"
                  onClick={() => {
                    setIsNavOpen(false);
                  }}
                >
                  <NavLink
                    to="/books"
                    className="text-gray-600  flex items-center active:text-blue-600"
                  >
                    <span className="block sm:hidden">
                      <MdBook size={20} className="me-2" />
                    </span>
                    Books
                  </NavLink>
                </li>
                <li
                  className="list-items"
                  onClick={() => {
                    setIsNavOpen(false);
                  }}
                >
                  <NavLink
                    to="/solve-doubt"
                    className="text-gray-600 flex items-center active:text-blue-600"
                  >
                    <span className="block sm:hidden">
                      <SiChatbot size={18} className="me-2" />
                    </span>
                    Ask AI
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="user relative">
              <div
                className="user-name flex items-center cursor-pointer"
                onClick={toggleMenu}
              >
                {!isLoading ? (
                  <div className="mx-1 p-2 text-white font-semibold bg-blue-500 rounded-xl center">
                    <span>{user?.firstName.charAt(0)}</span>
                    <span>{user?.lastName.charAt(0)}</span>
                  </div>
                ) : (
                  <Skeleton height={40} width={40} className="mx-3 mx-1" />
                )}
                <FaAngleDown size={20} className="text-gray-600" />
              </div>

              {isMenuOpen && (
                <div className="user-menu absolute top-12 right-0 backdrop-blur-xl bg-white rounded-3xl  border border-2 w-64 z-10">
                  <ul className="menu-list p-4">
                    <li className="text-gray-600 rounded-xl px-2 hover:bg-blue-600 hover:text-white transition-colors">
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
                    <li className="text-gray-600 rounded-xl px-2  hover:bg-blue-600 hover:text-white transition-colors">
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
                    <li className="text-gray-600 rounded-xl px-2  hover:bg-blue-600 hover:text-white transition-colors">
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
                    <li className="text-gray-600 rounded-xl px-2  hover:bg-blue-600 hover:text-white transition-colors">
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
                    <li className="text-gray-600 rounded-xl mt-1 px-2 hover:bg-red-600 hover:text-white transition-colors border-t border-gray-200">
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
          </div>
        )}
      </div>
      {token && (
        <div
          className={`navbar-overlay absolute left-0 top-14 backdrop-blur-xl h-screen w-full ${
            isNavOpen ? "block" : "hidden"
          }`}
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
