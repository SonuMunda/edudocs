import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found center min-h-screen bg-red-900">
      <div className="center flex-col backdrop-blur-4">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-white mb-4">404</h1>
          <p className="text-2xl text-white mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>

          <div className="mt-4">
            <Link
              to="/"
              className="px-6 py-3 bg-blue-100 text-blue-600 font-semibold text-lg rounded-full shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white"
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
