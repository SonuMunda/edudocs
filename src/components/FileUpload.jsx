import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { userDocumentUpload } from "../store/slices/userSlice";
import fetchUserId from "../utils/FetchUserId";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatalistInput } from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import universitiesList from "../api/universitiesList";
import coursesList from "../api/coursesList";
import sessionsList from "../api/sessionsList";
import styled from "styled-components";
import { ColorRing } from "react-loader-spinner";
import { MdOutlineFileUpload, MdUpload } from "react-icons/md";

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
  const id = fetchUserId();

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

  const handleUpload = async (values) => {
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

        await dispatch(userDocumentUpload({ id, formData, toast }));
      }
    } catch (error) {
      toast.error("Error during file upload");
    }
  };

  return (
    <main className="file-upload center min-h-screen p-4">
      <ToastContainer />
      <div className="container my-14 p-4 max-w-6xl bg-gray-50 rounded-2xl">
        <div className="file-upload-form font-semibold">
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
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                await handleUpload(values);
              } catch (error) {
                toast.error(error.message);
              } finally {
                setSubmitting(false);
                resetForm();
                setFile(null);
              }
            }}
          >
            {({ setFieldValue, errors, touched, values, isSubmitting }) => (
              <Form
                encType="multipart/form-data"
                className="form flex-col md:flex-row flex gap-10"
              >
                <div
                  className={`form-group center flex-col upload-box border-4 border-blue-200 ${
                    isDragging ? "border-blue-800" : "border-dashed"
                  } rounded-2xl
                  xl p-10 bg-white my-2 w-full`}
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
                  <MdOutlineFileUpload
                    size={64}
                    className="center text-blue-500"
                  />
                  <h1 className="center text-xl font-semibold text-gray-600 m-1">
                    Drag & Drop Your File
                  </h1>
                  <h1 className="center text-xl font-semibold text-gray-600 m-1">
                    Or Upload
                  </h1>
                  <p className="text-center text-gray-500 my-2">
                    Supported files: pdf, doc, docx
                  </p>
                  <button type="button" className="btn block mx-auto">
                    <label
                      htmlFor="file"
                      className="center my-2 px-6 py-2 bg-blue-600 rounded-3xl text-white cursor-pointer"
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

                <div className="form-right w-full sm:p-10">
                  {file && (
                    <div className="my-5">
                      <h4 className="text-lg font-semibold mb-1">
                        Selected File:
                      </h4>
                      <div className="flex items-center justify-between p-3 bg-white rounded">
                        <span className="text-gray-900">{file.name}</span>
                        <div className="flex gap-6">
                          <span className="text-gray-800 text-sm">
                            {(file.size / 1024).toFixed(2)} KB
                          </span>
                          <button
                            type="button"
                            className="text-red-600 text-xl"
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
                      className={`font-normal p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 w-full rounded ${
                        errors.category && touched.category
                          ? "border-red-500"
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

                  <div className="form-group ">
                    <label
                      htmlFor="university"
                      className="block my-2 font-normal"
                    >
                      University
                    </label>
                    <StyledDataListInput
                      value={values.university}
                      label="Select your university"
                      showLabel={false}
                      items={universitiesList.map((university) => ({
                        id: university.id,
                        value: university.value,
                      }))}
                      onSelect={(item) =>
                        setFieldValue("university", item.value)
                      }
                      className={`datalist font-normal ${
                        errors.university && touched.university
                          ? "border border-red-500"
                          : ""
                      }`}
                    />
                    {errors.university && touched.university && (
                      <div className="text-red-500 text-xs">
                        {errors.university}
                      </div>
                    )}
                  </div>

                  <div className="form-group my-2">
                    <label htmlFor="course" className="block font-normal">
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
                      className={`datalist font-normal ${
                        errors.course && touched.course
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
                      className={`datalist font-normal ${
                        errors.session && touched.session
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
                    <label
                      htmlFor="description"
                      className="block font-normal"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Write something about document."
                      rows="3"
                      className={`font-normal p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 w-full rounded ${
                        errors.description && touched.description
                          ? "border-red-500"
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

                  <div className="center py-4">
                    <button
                      type="submit"
                      className="font-normal center w-full h-10 bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <ColorRing
                          height={36}
                          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                        />
                      ) : (
                        <span className="center gap-2">
                          Upload <MdUpload size={24} />
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
    </main>
  );
};

export default FileUpload;
