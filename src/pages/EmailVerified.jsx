import { MdCheckCircleOutline } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white ring ring-gray-200 rounded-3xl p-6 text-center">
        <div className="mb-6">
          <MdCheckCircleOutline
            size={100}
            className="text-green-600 mx-auto mb-5"
          />
          <h1 className="text-2xl font-semibold text-green-600">
            Email Verified Successfully!
          </h1>
        </div>
        <p className="text-gray-600 mb-8">
          The email <span className="font-medium">{email}</span> has been
          verified successfully. You can now log in and access your account.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          onClick={() => (window.location.href = "/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerified;
