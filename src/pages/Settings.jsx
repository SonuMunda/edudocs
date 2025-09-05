import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { updateUserProfile } from "../store/slices/authSlice";
import { updatePassword } from "../store/slices/authSlice";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Settings = () => {
  const { user, isLoading } = useSelector((state) => state?.auth);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    username: user?.username,
    university: user?.university,
  };

  const passwordIntitialValues = {
    currentPassword: "",
    newPassword: "",
  };

  const usernameRegex = /^[a-z][a-z0-9._]*[a-z0-9]$/i;
  const nameRegex = /^[a-zA-Z]+$/;
  const profileValidationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .matches(usernameRegex, "Invalid username format")
      .min(5, "Username to short")
      .max(20, "Username to long")
      .lowercase("Username must be lowercase")
      .trim(),
    firstName: Yup.string()
      .required("First name is required")
      .matches(nameRegex, "First name must be alphabets only")
      .min(3, "First name to short")
      .max(20, "First name to long")
      .trim(),
    lastName: Yup.string()
      .required("Last name is required")
      .matches(nameRegex, "Last name must be alphabets only")
      .min(3, "Last name to short")
      .max(20, "Last name to long")
      .trim(),
    university: Yup.string()
      .required("University is required")
      .min(3, "University to short")
      .max(50, "University to long")
      .trim(),
  });

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password to short")
      .max(20, "Password to long")
      .trim(),
  });

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      await dispatch(updateUserProfile({ data: values, toast }));
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = async (values, { setSubmitting }) => {
    try {
      await dispatch(updatePassword({ data: values, toast }));
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <section id="settings" className="w-full center">
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="content bg-white max-w-2xl mx-auto p-4 sm:p-10">
            <h3 className="text-3xl font-bold mb-4 border-b-2 pb-4">Settings</h3>
            <h4 className="text-xl font-semibold my-4">Account Settings</h4>
            <p className="text-gray-600 mb-4">
              Update your account information below.
            </p>
            <div className="update-profile-form">
              <Formik
                initialValues={initialValues}
                validationSchema={profileValidationSchema}
                onSubmit={handleUpdateProfile}
              >
                {({ isSubmitting }) => (
                  <Form className="update-form">
                    <div className="form-group relative flex flex-col pb-5 mb-3">
                      <label htmlFor="firstName" className="block text-gray-600">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="w-full p-2 ring-1 ring-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-xs font-semibold absolute bottom-0"
                      />
                    </div>

                    <div className="form-group relative flex flex-col pb-5 mb-3">
                      <label htmlFor="lastName" className="block text-gray-600">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="w-full p-2 ring-1 ring-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-xs font-semibold absolute bottom-0"
                      />
                    </div>

                    <div className="form-group relative flex flex-col pb-5 mb-3">
                      <label htmlFor="username" className="block text-gray-600">
                        Username
                      </label>
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="w-full p-2 ring-1 ring-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-xs font-semibold absolute bottom-0"
                      />
                    </div>

                    <div className="form-group relative flex flex-col pb-5 mb-3">
                      <label htmlFor="university">University</label>
                      <Field
                        type="text"
                        name="university"
                        id="university"
                        className="w-full p-2 ring-1 ring-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />

                      <ErrorMessage
                        name="university"
                        component="div"
                        className="text-red-500 text-xs font-semibold absolute bottom-0"
                      />
                    </div>

                    <div className="form-group relative flex flex-col pb-5 mb-3">
                      <label htmlFor="email" className="block text-gray-600">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        disabled
                        className="w-full p-2 ring-1 ring-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className={`my-6 py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${isSubmitting && "cursor-not-allowed"
                        }`}
                      disabled={isSubmitting}
                    >
                      {!isSubmitting ? "Update" : "Updating..."}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <h4 className="text-xl font-semibold mt-10 mb-4">
              Password Settings
            </h4>
            <p className="text-gray-600 mb-4">Update your password below.</p>

            <div className="update-profile-form">
              <Formik
                initialValues={passwordIntitialValues}
                validationSchema={passwordValidationSchema}
                onSubmit={handlePasswordChange}
              >
                {({ isSubmitting }) => (
                  <Form action="">
                    <div className="form-group relative flex flex-col pb-5 mb-3">
                      <label
                        htmlFor="currentPassword"
                        className="block text-gray-600"
                      >
                        Current Password
                      </label>

                      <div className="relative">
                        <Field
                          type={showCurrentPass ? "text" : "password"}
                          name="currentPassword"
                          id="currentPassword"
                          className="w-full p-2 ring-1 ring-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <button
                          type="button"
                          className="absolute inset-y-0 right-2 flex items-center"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                        >
                          {showCurrentPass ? (
                            <IoMdEye className="text-gray-600" size={24} />
                          ) : (
                            <IoMdEyeOff className="text-gray-600" size={24} />
                          )}
                        </button>
                      </div>

                      <ErrorMessage
                        name="currentPassword"
                        component="div"
                        className="text-red-500 text-xs font-semibold absolute bottom-0"
                      />
                    </div>

                    <div className="form-group relative flex flex-col pb-5 mb-3">
                      <label
                        htmlFor="newPassword"
                        className="block text-gray-600"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <Field
                          type={showNewPass ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          className="w-full p-2 ring-1 ring-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <button
                          type="button"
                          className="absolute inset-y-0 right-2 flex items-center"
                          onClick={() => setShowNewPass(!showNewPass)}
                        >
                          {showNewPass ? (
                            <IoMdEye className="text-gray-600" size={24} />
                          ) : (
                            <IoMdEyeOff className="text-gray-600" size={24} />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="newPassword"
                        id="newPassword"
                        component="div"
                        className="text-red-500 text-xs font-semibold absolute bottom-0"
                      />
                    </div>

                    <button
                      type="submit"
                      className={`my-6 py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${isSubmitting && "cursor-not-allowed"
                        }`}
                      disabled={isSubmitting}
                    >
                      {!isSubmitting ? "Update" : "Updating..."}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
