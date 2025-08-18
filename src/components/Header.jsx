import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Logout from "../utils/Logout";
import { fetchUserDetails } from "../store/slices/authSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LuBook, LuBot, LuFileUp, LuHouse, LuLogIn, LuLogOut, LuMenu, LuSettings, LuTrophy, LuUser, LuWrench, LuX } from "react-icons/lu";
import "react-toastify/dist/ReactToastify.css";
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
      className={`flex justify-between items-center sticky w-full bg-white shadow z-10 transition-all duration-300 ${showNavbar ? "top-0" : "-top-16"
        }`}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between py-1 px-4">
        <div className="center gap-3">
          <div className="flex items-center cursor-pointer md:hidden">
            <LuMenu size={24} onClick={handleToggleNav} />
          </div>

          <div
            className="logo edu-text flex  items-center gap-1 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/images/logo.png" alt="logo" className="h-8" />
            <h2 className="text-2xl font-extrabold text-blue-600">
              <span className="text-black">Edu</span>Docs
            </h2>
          </div>
        </div>

        <nav
          className={`navbar fixed top-0 left-0 h-dvh w-80 ${isNavOpen ? "-translate-x-0" : "-translate-x-full"
            } overflow-hidden bg-white md:relative md:w-fit md:top-0 md:h-fit z-10 transitions duration-100 ease-in-out transition-transform-full md:translate-x-0`}
        >
          <div className="flex gap-3 py-1 px-3 items-center cursor-pointer md:hidden border-b">
            <div className="close-btn p-2 rounded">
              <LuX size={24} onClick={() => setIsNavOpen(false)} />
            </div>
            <div
              className="logo edu-text flex  items-center gap-1 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src="/images/logo.png" alt="logo" className="h-8" />
              <h2 className="text-2xl font-extrabold text-blue-600">
                <span className="text-black">Edu</span>Docs
              </h2>
            </div>
          </div>
          <ul className="flex flex-col md:flex-row md:items-center md:gap-2 px-2 md:mt-0 mt-4 ">
            <li
              className="list-items hover:bg-gray-200 md:hover:bg-white rounded-xl"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
              >
                <span className="block md:hidden">
                  <LuHouse size={24} className="me-2" />
                </span>
                Home
              </NavLink>
            </li>
            <li
              className="list-items hover:bg-gray-200 md:hover:bg-white rounded-xl"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/books"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800 "
              >
                <span className="block  md:hidden">
                  <LuBook size={24} className="me-2" />
                </span>
                Books
              </NavLink>
            </li>
            <li
              className="list-items hover:bg-gray-200 md:hover:bg-white rounded-xl"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/solve-doubt"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
                target="_blank"
              >
                <span className="block md:hidden">
                  <LuBot size={24} className="me-2" />
                </span>
                EduQueria
              </NavLink>
            </li>

            <li
              className="list-items hover:bg-gray-200 md:hover:bg-white rounded-xl"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/tools"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
              >
                <span className="block md:hidden">
                  <LuWrench size={24} className="me-2" />
                </span>
                Tools
              </NavLink>
            </li>

            <li
              className="list-items hover:bg-gray-200 md:hover:bg-white rounded-xl"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <NavLink
                to="/leaderboard"
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
              >
                <span className="block md:hidden">
                  <LuTrophy size={24} className="me-2" />
                </span>
                Leaderboard
              </NavLink>
            </li>

            <li className="list-items hover:bg-gray-200 md:hover:bg-white rounded md:hidden">
              <NavLink
                to={`${token ? `/profile/${user?.username}` : "/signin"}`}
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block md:hidden">
                  <LuUser size={24} className="me-2" />
                </span>
                Profile
              </NavLink>
            </li>

            <li className="list-items  hover:bg-gray-200 md:hover:bg-white rounded md:hidden">
              <NavLink
                to={`${token ? "uploads" : "/signin"}`}
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block md:hidden">
                  <LuFileUp size={24} className="me-2" />
                </span>
                Upload
              </NavLink>
            </li>

            <li className="list-items hover:bg-gray-200 md:hover:bg-white rounded md:hidden">
              <NavLink
                to={`${token ? "/settings" : "/signin"}`}
                className="nav-link flex items-center p-3 md:p-2 text-gray-800"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <span className="block md:hidden">
                  <LuSettings size={24} className="me-2" />
                </span>
                Settings
              </NavLink>
            </li>
          </ul>
          <div className="navbar-btns md:hidden absolute bottom-0 border-t border-gray-400 w-full">
            {token ? (
              <>
                <button
                  className="text-center font-semibold flex items-center p-3 w-full"
                  onClick={() => {
                    Logout({ dispatch, navigate });
                    setIsNavOpen(false);
                  }}
                >
                  <LuLogOut size={24} className="me-2" />
                  Sign out
                </button>
              </>
            ) : (
              <NavLink
                to="/signin"
                className="text-center font-semibold flex items-center p-3 w-full"
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                <LuLogIn size={24} className="me-2" />
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
              <div className="user-menu absolute top-12 right-0 bg-white rounded-xl ring-2 ring-gray-200 w-48 z-10">
                <ul className="menu-list p-4">
                  <li className="menu-list">
                    <NavLink
                      to="/"
                      className="menu-link rounded full mb-1 text-center flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <LuHouse size={20} className="m-2" />
                      Home
                    </NavLink>
                  </li>
                  <li className="menu-list">
                    <NavLink
                      to={`/profile/${user.username}`}
                      className="menu-link rounded full mb-1 text-center flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <LuUser size={20} className="m-2" />
                      Profile
                    </NavLink>
                  </li>
                  <li className="menu-list">
                    <NavLink
                      to="/uploads"
                      className="menu-link rounded full mb-1 text-center flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <LuFileUp size={20} className="m-2" />
                      Upload
                    </NavLink>
                  </li>
                  <li className="menu-list">
                    <NavLink
                      to="/settings"
                      className="menu-link rounded full mb-1 text-center flex items-center hover:bg-gray-200 hover:text-black transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <LuSettings size={20} className="m-2" />
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
                      <LuLogOut size={20} className="m-2" />
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
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Sign in
            </NavLink>
          </div>
        )}

      </div>
      <div
        className={`navbar-overlay fixed left-0 top-0 h-screen w-full ${isNavOpen ? "block" : "hidden"
          }`}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={() => setIsNavOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
