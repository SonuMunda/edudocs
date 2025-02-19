import { MdCheckCircle } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="center min-h-screen bg-white sm:bg-slate-100 sm:p-4">
      <div className="sm:max-w-md h-full w-full bg-white sm:border rounded p-6 text-center">
        <div className="mb-6">
          <MdCheckCircle size={100} className="text-green-600 mx-auto mb-5" />
          <h1 className="text-2xl font-semibold text-green-600">
            Email Verified Successfully!
          </h1>
        </div>
        <p className="text-gray-600 mb-8">
          The email <span className="font-medium">{email}</span> has been
          verified successfully. You can now log in and access your account.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
          onClick={() => (window.location.href = "/signin")}
        >
          Move to Signin Page
        </button>
      </div>
    </div>
  );
};

export default EmailVerified;
