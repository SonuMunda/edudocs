import { FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 p-8 text-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold text-white mb-2">EduDocs</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering students and educators with a seamless platform to share notes, documents, and assignments.
          </p>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold text-white mb-4">Why EduDocs?</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-gray-300">
              <FiCheckCircle className="text-blue-400" />
              Easily share and access study materials.
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <FiCheckCircle className="text-blue-400" />
              Simplified collaboration for students and educators.
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <FiCheckCircle className="text-blue-400" />
              Organized and searchable notes platform.
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <FiCheckCircle className="text-blue-400" />
              A growing community of learners.
            </li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold text-white mb-4">Get in Touch</h2>
          <p className="flex items-center gap-2 text-gray-300 text-sm mb-2">
            <FiMail className="text-blue-400" /> support@edudocs.com
          </p>
          <p className="flex items-center gap-2 text-gray-300 text-sm">
            <FiPhone className="text-blue-400" /> +91 1234567890
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 my-6"></div>

      <div className="text-center text-gray-400 text-sm">
        &copy; 2024 - {new Date().getFullYear()} EduDocs | Designed by Sonu Munda. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
