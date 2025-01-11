import {FaFaceSadTear } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found center min-h-screen p-2">
      <div className="center flex-col">
        <div className="text-center">
          <div className=" center text-9xl font-extrabold text-red-800 mb-4">
            4<FaFaceSadTear className="text-red-800" />4
          </div>
          <p className="text-2xl text-gray-500 mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>

          <div className="mt-4">
            <Link
              to="/"
              className="px-6 py-3 bg-gray-300 text-gray-600 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white"
            >
              Go Back Home
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <img
            src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif"
            alt="Explosion Animation"
            className="w-64 h-64 rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
