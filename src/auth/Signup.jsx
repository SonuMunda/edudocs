import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { signup } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { MdEmail, MdPerson, MdLock } from "react-icons/md";
import Logo from "../components/Logo";
import GoogleAuthSignin from "./GoogleAuthSignin";

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

  const nameRegex = /^[a-zA-Z]+$/;
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("- is required")
      .matches(nameRegex, "- must be alphabets only")
      .min(3, "- is too short")
      .max(20, "- is too long")
      .trim(),
    lastName: Yup.string()
      .required("- is required")
      .matches(nameRegex, "- must be alphabets only")
      .min(3, "- is too short")
      .max(20, "- is too long")
      .trim(),
    email: Yup.string()
      .email("- invalid  format")
      .required("- is required")
      .trim(),
    password: Yup.string()
      .required("- is required")
      .min(8, "- must be 8 characters long")
      .matches(/[0-9]/, "- requires a number")
      .matches(/[a-z]/, "- requires a lowercase letter")
      .matches(/[A-Z]/, "- requires an uppercase letter")
      .matches(/[^\w]/, "- requires a symbol")
      .trim(),
  });

  return (
    <>
      <ToastContainer />
      <section className="signup min-h-screen flex sm:items-center bg-gradient-to-b from-gray-800 to-blue-700">
        <div className="h-full sm:max-w-md bg-white pb-10 px-4 sm:p-8 sm:my-10 rounded sm:border shadow mx-auto">
          <Logo />
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Signup Now
          </h2>
          <p className="mt-3 text-lg text-gray-600 text-center sm:mt-5">
            Share and explore high-quality study resources with students.
          </p>

          <GoogleAuthSignin />

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              await handleSubmit(values, { setSubmitting });
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="signup-form rounded" autoComplete="off">
                {/* First Name */}
                <div className="form-group flex flex-col relative mb-4">
                  <label
                    htmlFor="firstName"
                    className={`text-gray-800 text-sm ${
                      errors.firstName && touched.firstName
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    <span className="font-semibold">First Name</span>
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className="ms-1 text-red-500 text-sm italic"
                    />
                  </label>
                  <div className="relative">
                    <div className="icon absolute top-1/2 -translate-y-1/2 left-0 text-xl p-2 text-gray-600">
                      <MdPerson />
                    </div>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="w-full pl-10 py-2 rounded ring-1 ring-gray-300 focus:outline-none  focus:ring-blue-500 transition-all ease-in-out"
                      placeholder="First Name"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="form-group flex flex-col relative  mb-4">
                  <label
                    htmlFor="lastName"
                    className={`text-gray-800 text-sm ${
                      errors.lastName && touched.lastName ? "text-red-500" : ""
                    }`}
                  >
                    <span className="font-semibold">Last Name</span>
                    <ErrorMessage
                      name="lastName"
                      component="span"
                      className="ms-1 text-red-500 text-sm italic"
                    />
                  </label>
                  <div className="relative">
                    <div className="icon absolute top-1/2 -translate-y-1/2 left-0 text-xl p-2 text-gray-600">
                      <MdPerson />
                    </div>
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="w-full pl-10 py-2 rounded ring-1 ring-gray-300 focus:outline-none  focus:ring-blue-500 transition-all ease-in-out"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group flex flex-col relative  mb-4">
                  <label
                    htmlFor="email"
                    className={`text-gray-800 text-sm ${
                      errors.email && touched.email ? "text-red-500" : ""
                    }`}
                  >
                    <span className="font-semibold">Email</span>
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="ms-1 text-red-500 text-sm italic"
                    />
                  </label>
                  <div className="relative">
                    <div className="icon absolute top-1/2 -translate-y-1/2 left-0 text-xl p-2 text-gray-600">
                      <MdEmail />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="w-full pl-10 py-2 rounded ring-1 ring-gray-300 focus:outline-none  focus:ring-blue-500 transition-all ease-in-out"
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-group flex flex-col relative mb-4">
                  <label
                    htmlFor="password"
                    className={`text-gray-800 text-sm ${
                      errors.password && touched.password ? "text-red-500" : ""
                    }`}
                  >
                    <span className="font-semibold">Password</span>
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="ms-1 text-red-500 text-sm italic"
                    />
                  </label>
                  <div className="relative">
                    <div className="icon absolute top-1/2 -translate-y-1/2 left-0 text-xl p-2 text-gray-600">
                      <MdLock />
                    </div>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="w-full pl-10 py-2 rounded ring-1 ring-gray-300 focus:outline-none  focus:ring-blue-500 transition-all ease-in-out"
                      placeholder="Password"
                    />
                    <div
                      className="icon absolute top-1/2 -translate-y-1/2 right-0 text-xl p-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-3 p-2 bg-blue-600 rounded hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing You Up..." : "Signup"}
                </button>

                {/* Login Link */}
              </Form>
            )}
          </Formik>
          <p className="text-center mt-4">
            <span className="text-gray-600">Already have an account?</span>
            <Link to="/signin" className="text-blue-800 ms-1">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signup;
