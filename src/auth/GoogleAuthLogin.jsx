import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleSignin } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleAuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {
      const credential = credentialResponse?.credential;
      if (credential) {
        dispatch(googleSignin({ credential, toast, navigate }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="google-login-btn w-full flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLogin(credentialResponse);
        }}
        onError={() => {
          toast.error("Login failed");
        }}
      />
    </div>
  );
};

export default GoogleAuthLogin;
