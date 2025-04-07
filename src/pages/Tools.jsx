import { Link } from "react-router-dom";
import { FaArrowRight, FaExchangeAlt, FaFileWord, FaFilePdf, FaFileImage } from "react-icons/fa";
import  tools  from "../api/toolsList";

const iconsMap = {
  FaFileWord: <FaFileWord className="text-blue-500 text-3xl" />,
  FaFilePdf: <FaFilePdf className="text-red-500 text-3xl" />,
  FaFileImage: <FaFileImage className="text-green-500 text-3xl" />
};

const Tools = () => {
  return (
    <section className="tools flex justify-center min-h-screen bg-gray-50">
      <div className="tools-container w-full max-w-6xl mt-16 p-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Office File Converter</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Easily convert between document formats with our powerful conversion tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className={`card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 ${tool.color}`}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  {iconsMap[tool.icon]}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{tool.name}</h2>
              </div>
              
              <p className="text-gray-600 mb-6">{tool.description}</p>
              
              <Link 
                to={tool.path} 
                className="convert-btn flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300"
              >
                <span>Convert Now</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-full">
            <FaExchangeAlt className="text-blue-500 mr-2" />
            <span className="text-gray-700">More conversion tools coming soon!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
