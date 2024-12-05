import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBook, FaHome, FaRobot } from "react-icons/fa";
import { FaAngleDown, FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Logout from "../utils/Logout";
import FetchUserId from "../utils/FetchUserId";
import { fetchUserDetails } from "../store/slices/userSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiCloudUpload, BiHome, BiLogOut, BiUser } from "react-icons/bi";
import { GiBigGear } from "react-icons/gi";

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
  }, [token, dispatch, id]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="flex justify-between items-center shadow p-2 fixed w-full bg-white px-10 z-10">
      <div className="center gap-2">
        <div className="menubar sm:hidden" onClick={handleToggleNav}>
          <FaBars size={24} />
        </div>
        <div className="logo">
          <NavLink to="/" className="center">
            <img src={logo} alt="logo" className="h-8" />
            <h1 className="text-xl font-semibold">EduDocs</h1>
          </NavLink>
        </div>
      </div>

      <div className="header-btns">
        {!token ? (
          <NavLink
            to="/login"
            className="btn btn-primary bg-indigo-600 font-medium text-white py-3 px-6 rounded"
          >
            Login
          </NavLink>
        ) : (
          <div className="center gap-4">
            <nav
              className={`navbar absolute top-14 left-0 h-screen w-${
                isNavOpen ? 80 : 0
              } overflow-hidden bg-slate-50 sm:relative sm:w-fit sm:top-0 sm:h-fit sm:bg-white z-10 transitions duration-100  ease-in-out`}
            >
              <ul className="flex flex-col sm:flex-row sm:items-center gap-6 p-8 sm:p-0 ">
                <li className="list-items">
                  <NavLink
                    to="/"
                    className="text-gray-600 font-semibold flex items-center "
                  >
                    <span className="block sm:hidden">
                      <FaHome size={20} className="mx-1" />
                    </span>
                    Home
                  </NavLink>
                </li>
                <li className="list-items">
                  <NavLink
                    to="/books"
                    className="text-gray-600 font-semibold flex items-center"
                  >
                    <span className="block sm:hidden">
                      <FaBook size={20} className="mx-1" />
                    </span>
                    Books
                  </NavLink>
                </li>
                <li className="list-items">
                  <NavLink
                    to="/solve-doubt"
                    className="text-gray-600 font-semibold flex items-center"
                  >
                    <span className="block sm:hidden">
                      <FaRobot size={20} className="mx-1" />
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
                  <div className="mx-1 p-2 text-white font-semibold bg-indigo-500 rounded center">
                    <span>{user?.firstName.charAt(0)}</span>
                    <span>{user?.lastName.charAt(0)}</span>
                  </div>
                ) : (
                  <Skeleton height={40} width={40} className="mx-3 mx-1" />
                )}
                <FaAngleDown size={20} className="text-gray-600" />
              </div>

              {isMenuOpen && (
                <div className="user-menu absolute top-12 right-0 backdrop-blur-xl bg-white rounded-lg  border border-2 w-64 z-10">
                  <ul className="menu-list p-4">
                    <li className="text-gray-600 rounded-lg px-2  hover:bg-indigo-600 hover:text-white transition-colors">
                      <NavLink
                        to="/"
                        className="block py-1 flex items-center "
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        <BiHome size={20} className="m-2" />
                        Home
                      </NavLink>
                    </li>
                    <li className="text-gray-600 rounded-lg px-2  hover:bg-indigo-600 hover:text-white transition-colors">
                      <NavLink
                        to={`/profile/${user.username}`}
                        className="block py-1 flex items-center"
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        <BiUser size={20} className="m-2" />
                        Profile
                      </NavLink>
                    </li>
                    <li className="text-gray-600 rounded-lg px-2  hover:bg-indigo-600 hover:text-white transition-colors">
                      <NavLink
                        to="/uploads"
                        className="block py-1 flex items-center "
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        <BiCloudUpload size={20} className="m-2" />
                        Uploads
                      </NavLink>
                    </li>
                    <li className="text-gray-600 rounded-lg px-2  hover:bg-indigo-600 hover:text-white transition-colors">
                      <NavLink
                        to="/settings"
                        className="block py-1 flex items-center "
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        <GiBigGear size={20} className="m-2" />
                        Settings
                      </NavLink>
                    </li>
                    <li className="text-gray-600 rounded-lg mt-1 px-2 hover:bg-red-600 hover:text-white transition-colors border-t border-gray-200">
                      <button
                        className="block py-1 flex items-center"
                        onClick={() => {
                          Logout({ dispatch, navigate });
                          setIsMenuOpen(false);
                        }}
                      >
                        <BiLogOut size={20} className="m-2" />
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
      <div
        className={`navbar-overlay absolute left-0 top-14 backdrop-blur-xl h-screen w-full ${
          isNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsNavOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
