import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiLogout, CiSaveUp2, CiUser } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Logout from "../utils/Logout";
import FetchUserId from "../utils/FetchUserId";
import { fetchUserDetails } from "../store/slices/userSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = () => {
  const { user, isLoading } = useSelector((state) => state?.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <header className="flex justify-between items-center p-2 fixed w-full bg-white px-10 border-b">
      <div className="logo">
        <NavLink to="/" className="center">
          <img src={logo} alt="logo" className="h-10" />
          <h1 className="text-2xl">edudocs</h1>
        </NavLink>
      </div>

      <div className="search-bar relative flex items-center">
        <input
          type="text"
          placeholder="Search for documents"
          className="p-3 border border-gray-300 rounded-full w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
        />
        <HiMagnifyingGlass
          size={24}
          className="text-indigo-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />
      </div>

      <nav className="navbar">
        <ul className="flex items-center gap-6">
          <li>
            <NavLink to="/" className="text-gray-600 font-semibold">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/documents" className="text-gray-600 font-semibold">
              Documents
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header-btns">
        {!token ? (
          <NavLink
            to="/login"
            className="btn btn-primary bg-indigo-600 font-medium text-white py-3 px-6 rounded"
          >
            Login
          </NavLink>
        ) : (
          <div className="user relative">
            <div
              className="user-name flex items-center cursor-pointer"
              onClick={toggleMenu}
            >
              {!isLoading ? (
                <div className="mx-1 py-1 px-3 text-white text-xl font-bold bg-indigo-500 rounded center">
                  <span>{user?.firstName.charAt(0)}</span>
                  <span> {user?.lastName.charAt(0)}</span>
                </div>
              ) : (
                <Skeleton height={40} width={40} className="mx-3 mx-1"/>
              )}
              <FaAngleDown size={20} className="text-gray-600" />
            </div>

            {isMenuOpen && (
              <div className="user-menu absolute top-12 right-0  bg-white rounded-lg shadow-lg border w-40 z-50">
                <ul className="menu-list">
                  <li className="text-gray-600 hover:bg-gray-100 transition-colors">
                    <NavLink
                      to="/profile"
                      className="block py-2 flex items-center "
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <CiUser size={20} className="m-2" />
                      Profile
                    </NavLink>
                  </li>
                  <li className="text-gray-600 hover:bg-gray-100 transition-colors">
                    <NavLink
                      to="/upload"
                      className="block py-2 flex items-center "
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <CiSaveUp2 size={20} className="m-2" />
                      Upload
                    </NavLink>
                  </li>
                  <li className="text-gray-600 hover:bg-gray-100 transition-colors">
                    <NavLink
                      to="/upload"
                      className="block py-2 flex items-center "
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <IoSettingsOutline size={20} className="m-2" />
                      Settings
                    </NavLink>
                  </li>
                  <li className="text-gray-600 hover:bg-red-100 transition-colors border-t border-gray-200">
                    <button
                      className="block py-2 flex items-center"
                      onClick={() => {
                        Logout({ dispatch, navigate });
                        setIsMenuOpen(false);
                      }}
                    >
                      <CiLogout size={16} className="m-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
