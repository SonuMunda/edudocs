import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { newGoogleSignin } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleSigninButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const { access_token } = tokenResponse;
      dispatch(newGoogleSignin({ accessToken: access_token, toast, navigate }));
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center font-semibold gap-10 w-full p-3 border-2 text-left border-gray-300 rounded my-4 hover:border-blue-600"
    >
      <FcGoogle size={24} />
      <span className="text-gray-700 text-sm">Sign in with Google</span>
    </button>
  );
};

export default GoogleSigninButton;
