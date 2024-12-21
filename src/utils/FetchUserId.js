import { isExpired, decodeToken } from "react-jwt";

const FetchUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = decodeToken(token);
    const userId = decodedToken?.userId;
    return userId;
  }

  if (isExpired(token)) {
    return null;
  }

  return null;
};

export default FetchUserId;
