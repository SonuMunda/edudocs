import { logout } from "../store/slices/authSlice";

const Logout = ({ dispatch, navigate }) => {
  dispatch(logout());
  navigate("/signin");
};

export default Logout;
