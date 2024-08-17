import { logout } from "../store/slices/authSlice";

const Logout = ({ dispatch, navigate }) => {
  dispatch(logout());
  navigate("/login");
};

export default Logout;
