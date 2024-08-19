import { useJwt } from "react-jwt";
const FetchUserId = () => {
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  if (token || !isExpired) {
    try {
      return decodedToken.userId;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.warn("No token found");
  }
};

export default FetchUserId;
