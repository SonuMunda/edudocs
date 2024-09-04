import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { userDocumentUpload } from "../store/slices/userSlice";
import fetchUserId from "../utils/FetchUserId";
import { toast, ToastContainer } from "react-toastify";

const FileUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const id = fetchUserId();

  const handleFileChange = (event, setFieldValue) => {
    const selectedFile = event.target.files[0];
    const validFile = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(selectedFile.type);

    if (validFile) {
      setFile(selectedFile);
      setFieldValue("file", selectedFile);
    } else {
      setFile(null);
      setFieldValue("file", null);
    }
  };

  const handleUpload = (values) => {
    if (file) {
      const formData = new FormData();
      formData.append("file",file);

      const fileName = file.name;
      formData.append("filename", fileName);

      const fileType = file.type;
      formData.append("fileType", fileType);

      formData.append("category", values.category);

      dispatch(userDocumentUpload({ id, formData, toast }));
    }
  };

  return (
    <section className="file-upload center">
      <ToastContainer/>
      <div className="container p-10 max-w-4xl">
        <p className="text-gray-600 mt-2">Upload your file here.</p>
        <div className="file-upload-form">
          <Formik
            initialValues={{ file: null, category: "" }}
            validationSchema={Yup.object().shape({
              file: Yup.mixed().required("A file is required"),
              category: Yup.string().required("Category is required"),
            })}
            onSubmit={handleUpload}
          >
            {({ setFieldValue, errors, touched, values, isSubmitting }) => (
              <Form encType="multipart/form-data">
                <div className="form-group upload-box border-2 border-indigo-300 border-dashed rounded p-10 bg-indigo-50 my-2">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="hidden"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                  />
                  <h1 className="center text-xl font-semibold text-gray-600 m-1">
                    Drag & Drop Your File
                  </h1>
                  <h1 className="center text-xl font-semibold text-gray-600 m-1">
                    Or Upload
                  </h1>
                  <p className="text-center text-gray-500 mt-2">
                    Supported files: pdf, doc, docx
                  </p>
                  <button type="button" className="btn block mx-auto">
                    <label
                      htmlFor="file"
                      className="center my-2 px-6 py-2 bg-indigo-600 rounded text-white font-bold cursor-pointer"
                    >
                      Browse my files
                    </label>
                  </button>
                  {errors.file && touched.file ? (
                    <div className="text-red-500 text-center mt-2">
                      {errors.file}
                    </div>
                  ) : null}
                </div>

                {file && (
                  <div className="my-5">
                    <h4 className="text-lg font-semibold">Selected File:</h4>
                    <div className="flex items-center justify-between p-3 bg-gray-100">
                      <span className="text-gray-700">{file.name}</span>
                      <div className="flex gap-6">
                        <span className="text-gray-500 text-sm">
                          {(file.size / 1024).toFixed(2)} KB
                        </span>
                        <button
                          type="button"
                          className="text-red-600 text-lg"
                          onClick={() => {
                            setFile(null);
                            setFieldValue("file", null);
                          }}
                        >
                          <CiTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="category" className="block mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={values.category}
                    onChange={(e) => setFieldValue("category", e.target.value)}
                  >
                    <option value="">Choose File Category</option>
                    <option value="assignment">Assignment</option>
                    <option value="notes">Notes</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.category && touched.category ? (
                    <div className="text-red-500 mt-2">{errors.category}</div>
                  ) : null}
                </div>

                <div className="form-group mt-6">
                  <button
                    type="submit"
                    className="btn btn-indigo rounded bg-indigo-700 w-full p-2 text-white font-bold"
                  >
                    Upload & Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default FileUpload;
