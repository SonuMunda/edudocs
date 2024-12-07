import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
const FetchUserId = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  if (token || !isExpired) {
    try {
      return decodedToken?.userId;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    localStorage?.removeItem("token");
    navigate("/login");
  }
};

export default FetchUserId;
