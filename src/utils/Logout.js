import { logout } from "../store/slices/authSlice";

const Logout = async ({ dispatch, navigate }) => {
  await dispatch(logout());
  navigate("/signin");
};

export default Logout;
