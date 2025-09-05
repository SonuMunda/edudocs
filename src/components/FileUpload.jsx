import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { userDocumentUpload } from "../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatalistInput } from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import coursesList from "../api/coursesList";
import sessionsList from "../api/sessionsList";
import styled from "styled-components";
import { LuCloudUpload, LuTrash2 } from "react-icons/lu";

const StyledDataListInput = styled(DatalistInput)`
  &.datalist input {
    padding: 0.7rem;
  }
  &.datalist input:focus {
    outline: 1px solid #6366f1;
  }
  &.datalist {
    border-radius: 0.4rem;
  }
`;

const FileUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  window.scrollTo(0, 0);

  const handleFileChange = (event, setFieldValue) => {
    const selectedFile = event.target.files[0];
    const validFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds the 10MB limit!");
        setFile(null);
        setFieldValue("file", null);
        return;
      }
      setFile(selectedFile);
      setFieldValue("file", selectedFile);
    } else {
      toast.error("Invalid file type! Please upload a pdf, doc, or docx.");
      setFile(null);
      setFieldValue("file", null);
    }
  };

  const handleUpload = async (values, { setSubmitting, resetForm }) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);
        formData.append("fileType", file.type);
        formData.append("category", values.category);
        formData.append("university", values.university);
        formData.append("course", values.course);
        formData.append("session", values.session);
        formData.append("description", values.description);

        await dispatch(userDocumentUpload({ formData, toast }));
      }
    } catch (error) {
      toast.error("Failed to upload");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <section className="file-upload center">
      <ToastContainer />
      <div className="container max-w-7xl mx-auto px-4 py-20">
        <div className="file-upload-form max-w-3xl mx-auto bg-white p-4 sm:p-10 rounded-3xl space-y-10">
          <Formik
            initialValues={{
              file: null,
              category: "",
              university: "",
              course: "",
              session: "",
              description: "",
            }}
            validationSchema={Yup.object().shape({
              file: Yup.mixed().required("A file is required"),
              category: Yup.string().required("Category is required"),
              university: Yup.string().required("University is required"),
              course: Yup.string().required("Course is required"),
              session: Yup.string().required("Session is required"),
              description: Yup.string().required("Description is required"),
            })}
            onSubmit={handleUpload}
          >
            {({ setFieldValue, errors, touched, values, isSubmitting }) => (
              <Form
                encType="multipart/form-data"
                className="form space-y-10"
              >

                <div
                  className={`form-group flex flex-col items-center justify-center gap-4 upload-box border-4 border-blue-200 ${isDragging ? "border-blue-500 bg-blue-200" : "border-dashed"
                    } rounded-3xl p-10 bg-neutral-50 my-2 w-full`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const droppedFile = e.dataTransfer.files[0];
                    handleFileChange(
                      { target: { files: [droppedFile] } },
                      setFieldValue
                    );
                  }}
                >
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="hidden"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                  />
                  <LuCloudUpload
                    size={64}
                    className="mx-auto text-blue-500"
                  />
                  <div className="center flex-wrap text-xl gap-1 font-semibold">
                    <h1 className="text-neutral-900">
                      Drag & Drop file or
                    </h1>
                    <label
                      htmlFor="file"
                      className="text-blue-600 underline"
                    >
                      Browse
                    </label>
                  </div>
                  <p className="text-center text-neutral-600">
                    Supported files: pdf, doc, docx
                  </p>
                  {errors.file && touched.file ? (
                    <div className="text-red-500 text-center mt-2">
                      {errors.file}
                    </div>
                  ) : null}
                </div>

                <div className="form-right h-full w-full m-auto bg-white">
                  {file != null && (
                    <div className="file mb-4">
                      <h4 className="text-lg font-semibold mb-2 text-neutral-800 flex items-center gap-2">
                        Selected File
                      </h4>
                      <div className="flex items-center justify-between p-4 bg-white rounded shadow-md border hover:shadow-lg transition">
                        {/* File Name */}
                        <span className="text-neutral-900 font-medium truncate max-w-xs">
                          {file.name}
                        </span>

                        {/* File Details + Delete */}
                        <div className="flex items-center gap-6">
                          <span className="text-neutral-600 text-sm bg-neutral-100 px-2 py-1 rounded">
                            {(file.size / 1024).toFixed(2)} KB
                          </span>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-700 text-2xl transition"
                            onClick={() => {
                              setFile(null);
                              setFieldValue("file", null);
                            }}
                            title="Remove File"
                          >
                            <LuTrash2 size={24} />
                          </button>
                        </div>
                      </div>
                    </div>

                  )}

                  <div className="form-group pb-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 font-normal"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      value={values.category}
                      id="category"
                      onChange={(e) =>
                        setFieldValue("category", e.target.value)
                      }
                      className={`font-normal p-2 ring-1 ring-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-700 w-full rounded ${errors.category && touched.category
                        ? "ring-red-500"
                        : ""
                        }`}
                    >
                      <option value="">Choose File Category</option>
                      <option value="assignment">Assignment</option>
                      <option value="notes">Notes</option>
                      <option value="practice material">
                        Practice Material
                      </option>
                      <option value="practical">Practical</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.category && touched.category ? (
                      <div className="text-red-500 text-xs">
                        {errors.category}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="university"
                      className="block my-2 font-normal"
                    >
                      University
                    </label>

                    <Field
                      id="university"
                      name="university"
                      as="input"
                      placeholder="Enter your university"
                      className={`font-normal p-2 ring-1 ring-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-700 w-full rounded
      ${errors.university && touched.university ? "border-red-500" : "border-gray-300"}`}
                    />

                    <ErrorMessage
                      name="university"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="form-group my-2">
                    <label
                      htmlFor="course"
                      className="block font-normal"
                      id="course"
                    >
                      Course
                    </label>
                    <StyledDataListInput
                      value={values.course}
                      id="course"
                      label="Select your course"
                      showLabel={false}
                      items={coursesList.map((course) => ({
                        id: course.id,
                        value: course.value,
                      }))}
                      onSelect={(item) => setFieldValue("course", item.value)}
                      className={`datalist font-normal ${errors.course && touched.course
                        ? "border border-red-500"
                        : ""
                        }`}
                    />
                    {errors.course && touched.course ? (
                      <div className="text-red-500 text-xs">
                        {errors.course}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group my-2">
                    <label htmlFor="session" className="block font-normal">
                      Session
                    </label>
                    <StyledDataListInput
                      value={values.session}
                      id="session"
                      label="Select your session"
                      showLabel={false}
                      items={sessionsList.map((session) => ({
                        id: session.id,
                        value: session.value,
                      }))}
                      onSelect={(item) => setFieldValue("session", item.value)}
                      className={`datalist font-normal ${errors.session && touched.session
                        ? "border border-red-500"
                        : ""
                        }`}
                    />
                    {errors.session && touched.session ? (
                      <div className="text-red-500 text-xs">
                        {errors.session}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group my-2">
                    <label htmlFor="description" className="block font-normal">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Write something about document."
                      rows="3"
                      className={`font-normal p-3 ring-1 ring-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-700 w-full rounded-md ${errors.description && touched.description
                        ? "ring-red-500"
                        : ""
                        }`}
                      value={values.description}
                      onChange={(e) =>
                        setFieldValue("description", e.target.value)
                      }
                    ></textarea>
                    {errors.description && touched.description ? (
                      <div className="text-red-500 text-xs">
                        {errors.description}
                      </div>
                    ) : null}
                  </div>

                  <div className="center my-4">
                    <button
                      type="submit"
                      className={`w-full p-3 font-semibold bg-blue-600 rounded-md hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${isSubmitting && "cursor-not-allowed"
                        }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Uploading...</span>
                      ) : (
                        <span className="center gap-2">
                          Upload <LuCloudUpload size={24} />
                        </span>
                      )}
                    </button>
                  </div>
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
