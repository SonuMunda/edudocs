import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ component }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  return <>{component}</>;
};

AuthGuard.propTypes = {
  component: PropTypes.element.isRequired,
};

export default AuthGuard;
