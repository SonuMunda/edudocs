import { FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paths = ["/solve-doubt", "/leend"];
  return (
    <>
      {paths.includes(location.pathname) ? (
        <></>
      ) : (
        <footer className="footer bg-neutral-950">
          <div className="container max-w-7xl px-4 py-10 mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="footer-cols">
                <div
                  className="logo edu-text flex  items-center gap-1 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <img src="/images/logo.png" alt="logo" className="h-8" />
                  <h2 className="text-2xl font-extrabold text-blue-400">
                    <span className="text-white">Edu</span>Docs
                  </h2>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Empowering students and educators with a seamless platform to
                  share notes, documents, and assignments.
                </p>
              </div>

              <div className="footer-cols">
                <h2 className="text-lg text-neutral-100 font-semibold mb-4">
                  Why EduDocs?
                </h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-neutral-300">
                    <FiCheckCircle className="text-blue-500" />
                    Easily share and access study materials.
                  </li>
                  <li className="flex items-center gap-2 text-neutral-300">
                    <FiCheckCircle className="text-blue-500" />
                    Simplified collaboration for students and educators.
                  </li>
                  <li className="flex items-center gap-2 text-neutral-300">
                    <FiCheckCircle className="text-blue-500" />
                    Organized and searchable notes platform.
                  </li>
                  <li className="flex items-center gap-2 text-neutral-300">
                    <FiCheckCircle className="text-blue-500" />A growing
                    community of learners.
                  </li>
                </ul>
              </div>

              <div className="footer-cols">
                <h2 className="text-lg text-neutral-100 font-semibold mb-4">
                  Get in Touch
                </h2>
                <p className="flex items-center gap-2 text-neutral-300 text-sm mb-2">
                  <FiMail className="text-blue-500" /> sonumunda1312@gmail.com
                </p>
                <p className="flex items-center gap-2 text-neutral-300 text-sm">
                  <FiPhone className="text-blue-500" /> +91 8437076442
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-700" />

          <div className="flex flex-wrap gap-4 justify-around text-center text-neutral-300 text-sm py-6">
            <p>
              &copy; {new Date().getFullYear()} EduDocs | Designed by Sonu
              Munda. All rights reserved.
            </p>

            <Link
              to="/privacy-policies"
              className="text-gray-300 hover:underline"
            >
              Privacy Policies
            </Link>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
