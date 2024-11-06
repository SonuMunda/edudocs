import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container flex justify-center w-full">
        <div className="flex flex-wrap justify-around items-center w-full">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">EduDocs</h1>
            <p className="text-sm text-gray-400">
              Your go-to platform for notes, documents, and assignments.
            </p>
          </div>

          {/* <div className="flex flex-col md:flex-row md:space-x-8">
            <Link
              to="/home"
              className="text-gray-400 hover:text-white mb-2 md:mb-0"
            >
             Home
            </Link>
            <Link
              to="/about"
              className="text-gray-400 hover:text-white mb-2 md:mb-0"
            >
              About
            </Link>
            <Link
              to="/books"
              className="text-gray-400 hover:text-white mb-2 md:mb-0"
            >
              Books
            </Link>
            <Link to="/documents" className="text-gray-400 hover:text-white">
              Documents
            </Link>
          </div> */}
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} EduDocs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
