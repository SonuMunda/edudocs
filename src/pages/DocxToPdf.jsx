import { Formik, Form } from "formik";
import { FaFileWord, FaRegFilePdf, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";

const DocxToPdf = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event, setFieldValue) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile);
        setFieldValue("file", selectedFile);
      } else {
        toast.error("Please select a valid DOCX file.", {
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

    if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFile(droppedFile);
    } else {
      toast.error("Please select a valid DOCX file.", {
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
        `${import.meta.env.VITE_SERVER_URL}/api/tools/docx-to-pdf`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setFile(null);
        setPdfUrl(responseData.downloadUrl);
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
      className={`converter ${isDragging ? "bg-blue-100" : ""}`}
      id="dropzone"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <ToastContainer />
      <div className={`container min-h-screen min-w-full p-4 relative`}>
        <h1 className="text-3xl font-bold text-center mt-10">
          Convert DOCX to PDF
        </h1>

        <p className="text-gray-600 text-center mb-4">
          Easily convert your DOCX file to PDF with just a click.
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
                  accept=".docx"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
                <label
                  htmlFor="file"
                  className="rounded cursor-pointer bg-blue-500 text-white p-6 text-center font-bold text-2xl hover:bg-blue-600 focus:ring-2 w-full block"
                >
                  Select WORD file
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
                    <FaFileWord className="text-7xl text-blue-500" />
                    <p className="text-gray-600 text-center mt-2">
                      {file.name}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`absolute bottom-20 right-10 px-6 py-3 rounded bg-blue-500 text-white font-bold text-xl hover:bg-blue-600 focus:ring-2 ${
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

        {pdfUrl && (
          <div className="mt-10">
            {/* <h3 className="text-xl font-bold">Download PDF:</h3> */}
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <button className="flex items-center mt-2 mx-auto p-4 gap-4 ring ring-red-400 hover:shadow-xl hover:shadow-red-400 bg-red-500 text-white  rounded">
                <FaRegFilePdf size={24} /> Download PDF
              </button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocxToPdf;
