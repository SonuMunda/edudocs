import { Formik, Form } from "formik";
import { FaFilePdf, FaFileWord, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";

const PdfToDocx = () => {
  const [file, setFile] = useState(null);
  const [docxUrl, setDocxUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event, setFieldValue) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType === "application/pdf") {
        setFile(selectedFile);
        setFieldValue("file", selectedFile);
      } else {
        toast.error("Please select a valid PDF file.", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Please select a file.", {
        position: "top-center",
      });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    const fileType = droppedFile.type;

    if (fileType === "application/pdf") {
      setFile(droppedFile);
    } else {
      toast.error("Please select a valid PDF file.", {
        position: "top-center",
      });
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!values.file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", values.file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/tools/pdf-to-docx`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setFile(null);
        setDocxUrl(responseData.downloadUrl);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        toast.error(errorData.message || "Something went wrong.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }

    setLoading(false);
    setSubmitting(false);
  };

  return (
    <section
      className={`min-h-screen flex justify-center  ${
        isDragging ? "bg-red-100" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <ToastContainer />
      <div className={`container p-4 mt-14 relative`} id="dropzone">
        <h1 className="text-3xl font-bold text-center mt-10">
          Convert PDF to DOCX
        </h1>

        <p className="text-gray-600 text-center mb-4">
          Select a PDF file to convert it to DOCX format.
        </p>

        <Formik initialValues={{ file: "" }} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="form">
              <div className="file-drop-zone relative w-full max-w-md mx-auto">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
                <label
                  htmlFor="file"
                  className="rounded cursor-pointer bg-red-500 text-white p-6 text-center font-bold text-2xl hover:bg-red-600 focus:ring-2 w-full block"
                >
                  Select PDF file
                </label>
                <p className="text-center text-gray-500">Or drag file here</p>
              </div>

              {file && (
                <div className="file-preview relative mx-auto bg-white center h-72 max-w-60 rounded-xl border border-2 mt-10 flex flex-col items-center hover:shadow-xl">
                  <div
                    className="remove-btn absolute right-0 top-0 rounded bg-gray-100 p-2 border cursor-pointer"
                    onClick={() => {
                      setFieldValue("file", "");
                      setFile(null);
                    }}
                  >
                    <FaTimes size={18} color="red" />
                  </div>
                  <div className="file-preview-inner flex flex-col justify-center items-center h-full w-full">
                    <FaFilePdf className="text-7xl text-red-500" />
                    <p className="text-gray-600 text-center mt-2">
                      {file.name}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`absolute bottom-10 right-10 px-6 py-3 rounded bg-red-500 text-white font-bold text-xl hover:bg-red-600 focus:ring-2 focus: ring-red-400 ${
                  !file || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!file || loading}
              >
                {loading ? (
                  <div className="flex items-center gap-4">
                    <span>Converting</span>
                    <ThreeCircles height={20} width={20} color="white" />
                  </div>
                ) : (
                  "Convert"
                )}
              </button>
            </Form>
          )}
        </Formik>

        {docxUrl && (
          <div className="mt-10">
            {/* <h3 className="text-xl font-bold">Download PDF:</h3> */}
            <a href={docxUrl} target="_blank" rel="noopener noreferrer">
              <button className="flex items-center mt-2 mx-auto p-4 gap-4 ring ring-blue-400 hover:shadow-xl hover:shadow-blue-400 bg-blue-500 text-white  rounded">
                <FaFileWord size={24} /> Download DOCX
              </button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PdfToDocx;
