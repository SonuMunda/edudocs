import { Link } from "react-router-dom";

const Tools = () => {
  return (
    <section className="tools flex justify-center min-h-screen">
      <div className="container min-w-full mt-14 p-4">
        <h1 className="text-3xl font-bold text-center mt-10">
          Office File Converter
        </h1>
        <p className="text-gray-600 text-center">
          Easily convert your documents, including DOCX, PDF, and other office
          file formats, with just a click.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          <div className="card bg-white p-4 rounded border-2">
            <h2 className="tool-name text-xl font-semibold">Docx to PDF</h2>
            <p className="text text-gray-500 mb-4">Convert your docx file to pdf</p>
            <Link to="/docx-to-pdf" className="convert-btn bg-blue-500 py-2 px-6 rounded text-white hover:bg-blue-600 focus:ring-2">
              Convert
            </Link>
          </div>

          <div className="card bg-white p-4 rounded border-2">
            <h2 className="tool-name text-xl font-semibold">PDF to Docx</h2>
            <p className="text text-gray-500 mb-4">Convert your pdf file to docx</p>
            <Link to="/docx-to-pdf" className="convert-btn bg-blue-500 py-2 px-6 rounded text-white hover:bg-blue-600 focus:ring-2">
              Convert
            </Link>
          </div>

          <div className="card bg-white p-4 rounded border-2">
            <h2 className="tool-name text-xl font-semibold">PDF to JPG</h2>
            <p className="text text-gray-500 mb-4">Convert your pdf file to jpg</p>
            <Link to="/docx-to-pdf" className="convert-btn bg-blue-500 py-2 px-6 rounded text-white hover:bg-blue-600 focus:ring-2">
              Convert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
