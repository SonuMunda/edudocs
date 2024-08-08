import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import FetchUserId from "../utils/FetchUserId";
import { useEffect } from "react";
import { fetchUserDetails } from "../store/slices/userSlice";

const Header = () => {
  const { user, isLogin } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const id = FetchUserId();
  console.log(user);
  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetails({ id }));
    }
  }, [id, dispatch]);

  return (
    <header className="flex justify-around items-center p-2 fixed w-full bg-white">
      <div className="logo">
        <NavLink to="/" className="center">
          <img src={logo} alt="logo" className="h-10" />
          <h1 className="text-2xl">edudocs</h1>
        </NavLink>
      </div>
      <nav className="navbar ms-4 font-medium">
        <ul className="navlist flex gap-6">
          <li className="list-items">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="list-items">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="list-items">
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>

      <div className="header-btns">
        {!isLogin ? (
          <NavLink
            to="/login"
            className="btn btn-primary bg-indigo-600 font-medium text-white py-3 px-6 rounded"
          >
            Login
          </NavLink>
        ) : (
          <NavLink to="/profile" className="center">
            <span className="mx-1 px-4 py-2 text-white font-bold  bg-indigo-500 rounded-xl">
              {user?.firstName.charAt(0)}
            </span>
            <span>{user?.username}</span>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
