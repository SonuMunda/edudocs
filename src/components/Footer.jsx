import { FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-8 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="md:w-1/3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="h-8 block" />
            <h2 className="text-2xl font-bold text-blue-500">
              <span className="text-black">Edu</span>Docs
            </h2>
          </Link>
          <p className="text-gray-900 text-sm leading-relaxed">
            Empowering students and educators with a seamless platform to share
            notes, documents, and assignments.
          </p>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold  mb-4">
            Why EduDocs?
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-gray-900">
              <FiCheckCircle className="text-blue-600" />
              Easily share and access study materials.
            </li>
            <li className="flex items-center gap-2 text-gray-900">
              <FiCheckCircle className="text-blue-600" />
              Simplified collaboration for students and educators.
            </li>
            <li className="flex items-center gap-2 text-gray-900">
              <FiCheckCircle className="text-blue-600" />
              Organized and searchable notes platform.
            </li>
            <li className="flex items-center gap-2 text-gray-900">
              <FiCheckCircle className="text-blue-600" />A growing community of
              learners.
            </li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold mb-4">
            Get in Touch
          </h2>
          <p className="flex items-center gap-2 text-gray-900 text-sm mb-2">
            <FiMail className="text-blue-600" /> sonumunda1312@gmail.com
          </p>
          <p className="flex items-center gap-2 text-gray-900 text-sm">
            <FiPhone className="text-blue-600" /> +91 8437076442
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 my-6"></div>

      <div className="flex flex-wrap gap-4 justify-around text-center text-gray-700 text-sm">
        <p>
          &copy;  {new Date().getFullYear()} EduDocs | Designed by Sonu
          Munda. All rights reserved.
        </p>

        <Link to="/privacy-policies" className="text-blue-800 hover:underline">
          Privacy Policies
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
