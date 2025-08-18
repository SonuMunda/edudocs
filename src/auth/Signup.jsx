import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { signup } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { LuEye, LuEyeClosed, LuLock, LuMail, LuUser } from "react-icons/lu";
// import GoogleAuthSignin from "./GoogleAuthSignin";
import GoogleSigninButton from "../components/GoogleSigninButton";
import { ThreeDots } from "react-loader-spinner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      .required("First Name is required")
      .matches(nameRegex, "First Name must be alphabets only")
      .min(3, "First Name is too short")
      .max(20, "First Name is too long")
      .trim(),
    lastName: Yup.string()
      .required("Last is required")
      .matches(nameRegex, "Last must be alphabets only")
      .min(3, "Last is too short")
      .max(20, "Last is too long")
      .trim(),
    email: Yup.string()
      .email("Email invalid  format")
      .required("Email is required")
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
    <>
      <ToastContainer />
      <section className="signup min-h-screen bg-gradient-to-tr from-white to-blue-100 flex items-center justify-center">
        <div className="container max-w-7xl mx-auto sm:px-4 sm:py-8 sm:py-12">
          <div className="content bg-white grid grid-cols-1 lg:grid-cols-2 md:rounded-3xl overflow-hidden shadow-xl">
            {/* Visual Section */}
            <div className="visual bg-gradient-to-b from-blue-900 to-blue-800 px-6 py-10 sm:p-10 lg:rounded-r-3xl">
              <div className="max-w-md mx-auto flex flex-col items-center justify-between h-full text-center text-neutral-100 space-y-6">
                <div className="logo">
                  <Link to="/">
                    <div className="logo-img p-3 bg-white rounded-full w-fit mx-auto shadow-md">
                      <img src="/images/logo.png" alt="EduDocs Logo" className="h-12 w-12" />
                    </div>
                    <h2 className="text-2xl font-semibold mt-3">EduDocs</h2>
                  </Link>
                </div>
                <div className="visual-text space-y-4 hidden lg:block">
                  <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
                  <p className="text-gray-200 text-base">
                    Share and explore high-quality study resources with students.
                  </p>
                </div>
                <Link to="/signin" className="hidden lg:block">
                  <button className="border-2 border-white text-white py-3 px-6 rounded-full w-full max-w-xs hover:bg-white hover:text-blue-900 transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
            {/* Form Section */}
            <div className="form bg-white px-6 py-10 sm:p-10">
              <div className="max-w-md mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Sign Up Now</h2>
                <p className="text-gray-600 text-base">
                  Signup to access our vast library of study resources.
                </p>
                <GoogleSigninButton />
                <p className="text-center uppercase text-gray-600 text-sm font-medium">
                  Or continue with
                </p>
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
                  {({ isSubmitting }) => (
                    <Form className="signup-form space-y-3" autoComplete="off">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* First Name */}
                        <div className="form-group flex flex-col relative pb-6">
                          <div className="relative">
                            <div className="icon absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-600">
                              <LuUser />
                            </div>
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                              className="w-full pl-10 pr-4 py-4 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              placeholder="First Name"
                            />
                          </div>
                          <ErrorMessage
                            name="firstName"
                            component="span"
                            className="text-red-500 text-sm absolute right-0 bottom-0"
                          />
                        </div>
                        {/* Last Name */}
                        <div className="form-group flex flex-col relative pb-6">

                          <div className="relative">
                            <div className="icon absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-600">
                              <LuUser />
                            </div>
                            <Field
                              type="text"
                              name="lastName"
                              id="lastName"
                              className="w-full pl-10 pr-4 py-4 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              placeholder="Last Name"
                            />
                          </div>
                          <ErrorMessage
                            name="lastName"
                            component="span"
                            className="text-red-500 text-sm absolute right-0 bottom-0"
                          />
                        </div>
                      </div>
                      {/* Email */}
                      <div className="form-group flex flex-col relative pb-6">
                        <div className="relative">
                          <div className="icon absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-600">
                            <LuMail />
                          </div>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="Email"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-red-500 text-sm absolute right-0 bottom-0"
                        />
                      </div>
                      {/* Password */}
                      <div className="form-group flex flex-col relative pb-6">
                        <div className="relative">
                          <div className="icon absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-600">
                            <LuLock />
                          </div>
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="w-full pl-10 pr-12 py-4 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="Password"
                          />
                          <div
                            className="icon absolute top-1/2 -translate-y-1/2 right-3 text-xl text-gray-600 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <LuEyeClosed /> : <LuEye />}
                          </div>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-red-500 text-sm absolute right-0 bottom-0"
                        />
                      </div>
                      {/* Submit Button */}
                      <button
                        type="submit"
                        className={`w-full py-3 bg-blue-600 rounded-full text-white font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isSubmitting && "cursor-not-allowed opacity-70"
                          }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="loader py-2 flex justify-center">
                            <ThreeDots height={6} color="white" />
                          </div>
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
                <p className="text-center text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
