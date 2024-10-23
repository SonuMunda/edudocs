import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found center min-h-screen bg-gradient-to-b from-red-800 to-indigo-600">
      <div className="center flex-col backdrop-blur-4">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-white mb-4">404</h1>
          <p className="text-2xl text-white mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>

          <div className="mt-4">
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-100 text-indigo-600 font-semibold text-lg rounded shadow-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white"
            >
              Go Back Home
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <img
            src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif"
            alt="Explosion Animation"
            className="w-64 h-64"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
