import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { updateUserProfile } from "../store/slices/authSlice";
import FetchUserId from "../utils/FetchUserId";
import { ThreeCircles } from "react-loader-spinner";
import { updatePassword } from "../store/slices/authSlice";

const Settings = () => {
  const { user, isLoading } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const id = FetchUserId();

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    username: user?.username,
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
  });

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password to short")
      .max(20, "Password to long")
      .trim(),
  });

  const handleUpdateProfile = (values, { setSubmitting }) => {
    dispatch(updateUserProfile({ id, data: values, toast }));
    setSubmitting(false);
  };

  const handlePasswordChange = (values, { setSubmitting }) => {
    dispatch(updatePassword({ id, data: values, toast })).then(() => {
      setSubmitting(false);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <ToastContainer />
      <section id="settings" className="p-4 sm:p-10 w-full bg-blue-100 center">
        <div className="container xs:max-w-full mt-12 mb-8 bg-white p-10 rounded-3xl shadow shadow-xl">
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
              {({ isSumitting }) => (
                <Form className="update-form">
                  <div className="form-group relative flex flex-col pb-5 mb-3">
                    <label htmlFor="firstName" className="block text-gray-600">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="username"
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
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 mt-4 rounded-full hover:bg-blue-700"
                    disabled={isSumitting}
                  >
                    {!isSumitting ? (
                      "Update"
                    ) : (
                      <ThreeCircles height={24} width={42} color="white" />
                    )}
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
              {({ isSumitting }) => (
                <Form action="">
                  <div className="form-group relative flex flex-col pb-5 mb-3">
                    <label
                      htmlFor="currentPassword"
                      className="block text-gray-600"
                    >
                      Current Password
                    </label>
                    <Field
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
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
                    <Field
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="newPassword"
                      id="newPassword"
                      component="div"
                      className="text-red-500 text-xs font-semibold absolute bottom-0"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 mt-4 rounded-full hover:bg-blue-700"
                    disabled={isSumitting}
                  >
                    {!isSumitting ? (
                      "Update"
                    ) : (
                      <ThreeCircles height={24} width={42} color="white" />
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Settings;
