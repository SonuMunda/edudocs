import { isExpired, decodeToken } from "react-jwt";

const FetchUserId = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const isTokenExpired = isExpired(token);

  if (isTokenExpired) {
    alert("Session expired, please signin again");
    localStorage.removeItem("token");
    window.location.href = "/signin";
    return null;
  }

  const decodedToken = decodeToken(token);

  if (!decodedToken) {
    alert("Invalid token, please signin again");
    localStorage.removeItem("token");
    window.location.href = "/signin";
    return null;
  }

  const userId = decodedToken?.userId;
  return userId || null;
};

export default FetchUserId;
