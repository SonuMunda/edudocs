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

const StyledDataListInput = styled(DatalistInput)`
  &.datalist input {
    padding: 0.6rem;
  }
  &.datalist input:focus {
    outline: 2px solid #6366f1;
  }
  &.datalist {
    border-radius: 0.25rem;
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
    <section className="file-upload center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="container p-10 max-w-4xl">
        <p className="text-gray-600 mt-2">Upload your file here.</p>
        <div className="file-upload-form">
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
              <Form encType="multipart/form-data">
                <div
                  className={`form-group upload-box border-2 border-indigo-900 ${
                    isDragging ? "border-indigo-600" : "border-dashed"
                  } rounded p-10 bg-indigo-50 my-2 hover:bg-indigo-100`}
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
                      className="center my-2 px-6 py-2 bg-indigo-800 rounded text-white cursor-pointer"
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
                    className="p-2 border-2  focus:outline-none focus:ring-1 focus:ring-indigo-700 w-full rounded"
                  >
                    <option value="">Choose File Category</option>
                    <option value="assignment">Assignment</option>
                    <option value="notes">Notes</option>
                    <option value="practice material">Practice Material</option>
                    <option value="practical">Practical</option>
                    <option value="book">Book</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.category && touched.category ? (
                    <div className="text-red-500 text-xs font-bold">
                      {errors.category}
                    </div>
                  ) : null}
                </div>

                {values.category && (
                  <>
                    <div className="form-group flex flex-col">
                      <label htmlFor="university" className="block my-2">
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
                        className="datalist"
                      />
                      {errors.university && touched.university && (
                        <div className="text-red-500 text-xs font-bold">
                          {errors.university}
                        </div>
                      )}
                    </div>

                    <div className="form-group flex flex-col">
                      <label htmlFor="course" className="block my-2">
                        Course
                      </label>
                      <StyledDataListInput
                        value={values.course}
                        label="Select your course"
                        showLabel={false}
                        items={coursesList.map((course) => ({
                          id: course.id,
                          value: course.value,
                        }))}
                        onSelect={(item) => setFieldValue("course", item.value)}
                        className="datalist"
                      />
                      {errors.course && touched.course ? (
                        <div className="text-red-500 text-xs font-bold">
                          {errors.course}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group flex flex-col">
                      <label htmlFor="session" className="block my-2">
                        Session
                      </label>
                      <StyledDataListInput
                        value={values.session}
                        label="Select your session"
                        showLabel={false}
                        items={sessionsList.map((session) => ({
                          id: session.id,
                          value: session.value,
                        }))}
                        onSelect={(item) =>
                          setFieldValue("session", item.value)
                        }
                        className="datalist"
                      />
                      {errors.session && touched.session ? (
                        <div className="text-red-500 text-xs font-bold">
                          {errors.session}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group my-2">
                      <label htmlFor="description" className="block mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        placeholder="Enter document description"
                        rows="3"
                        className="p-3 border-2  focus:outline-none focus:ring-1 focus:ring-indigo-700 w-full rounded"
                        value={values.description}
                        onChange={(e) =>
                          setFieldValue("description", e.target.value)
                        }
                      ></textarea>
                      {errors.description && touched.description ? (
                        <div className="text-red-500 text-xs font-bold">
                          {errors.description}
                        </div>
                      ) : null}
                    </div>
                  </>
                )}

                <div className="center py-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-800 text-white rounded"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Uploading..." : "Upload"}
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
