import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { signup } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(signup({ data: values, toast }));
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const usernameRegex = /^[a-z][a-z0-9._]*[a-z0-9]$/i;
  const nameRegex = /^[a-zA-Z]+$/;
  const validationSchema = Yup.object({
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
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .trim(),

    lastName: Yup.string()
      .required("Last name is required")
      .matches(nameRegex, "Last name must be alphabets only")
      .min(3, "First name to short")
      .max(20, "First name to long")
      .trim(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .trim(),
  });

  return (
    <main className="min-h-screen center">
      <ToastContainer />
      <section className="signup w-full p-4">
        <div className="h-full sm:max-w-md bg-white p-8 rounded-3xl ring ring-gray-200 shadow mt-12 mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-blue-500 text-center">
            Signup
          </h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              await handleSubmit(values, { setSubmitting });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="signup-form rounded" autoComplete="off">
                <div className="form-group flex flex-col relative pb-4 pt-1 my-2">
                  <label htmlFor="username" className="text-gray-600">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 "
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-xs  absolute bottom-0"
                  />
                </div>
                <div className="form-group flex flex-col relative pb-4 pt-1 my-2">
                  <label htmlFor="firstName" className="text-gray-600">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className=" p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-xs absolute bottom-0"
                  />
                </div>
                <div className="form-group flex flex-col relative pb-4 pt-1 my-2">
                  <label htmlFor="lastName" className="text-gray-600">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    className=" p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-xs  absolute bottom-0"
                  />
                </div>

                <div className="form-group flex flex-col relative pb-4 pt-1 my-2">
                  <label htmlFor="email" className="text-gray-600">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs  absolute bottom-0"
                  />
                </div>
                <div className="form-group flex flex-col relative pb-4 pt-1 my-2">
                  <label htmlFor="password" className="text-gray-600">
                    Password
                  </label>

                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter your password"
                    />

                    <div
                      className="icon absolute top-1/2 -translate-y-1/2 right-0 text-xl p-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs  absolute bottom-0"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full my-2 py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 text-white  shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing You Up..." : "Signup"}
                </button>

                <p className="text-center my-2">
                  Already have an account?
                  <Link to="/signin" className="text-blue-800 ms-1">
                    Login
                  </Link>
                </p>

                {/* <p className="text-center">Or continue with</p> */}
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default Signup;
