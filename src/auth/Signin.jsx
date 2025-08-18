import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { LuEye, LuEyeClosed, LuLock, LuMail } from "react-icons/lu";
import GoogleSigninButton from "../components/GoogleSigninButton";
import { ThreeDots } from "react-loader-spinner";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(signin({ data: values, toast, navigate }));
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email")
      .required("Email is required")
      .trim(),
    password: Yup.string().required("Password is required"),
  });

  return (
    <>
      <ToastContainer />
      <section className="login min-h-screen bg-gradient-to-tr from-white to-blue-100 flex items-center justify-center">
        <div className="container max-w-7xl mx-auto sm:px-4 sm:py-8 sm:py-12">
          <div className="content bg-white grid grid-cols-1 lg:grid-cols-2 sm:rounded-3xl overflow-hidden shadow-xl">
            {/* Visual Section */}
            <div className="visual bg-gradient-to-b from-blue-900 to-blue-800 px-6 py-10 sm:p-10  lg:rounded-r-3xl">
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
                  <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
                  <p className="text-gray-200 text-base">
                    Share and explore high-quality study resources with students.
                  </p>
                </div>
                <Link to="/signup" className="hidden lg:block">
                  <button className="border-2 border-white text-white py-3 px-6 rounded-full w-full max-w-xs hover:bg-white hover:text-blue-900 transition-colors duration-300">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
            {/* Form Section */}
            <div className="form bg-white px-6 py-10 sm:p-10">
              <div className="max-w-md mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
                <p className="text-gray-600 text-base">
                  Signin to your EduDocs account.
                </p>
                <GoogleSigninButton />
                <p className="text-center uppercase text-gray-600 text-sm font-medium mb-4">
                  Or continue with
                </p>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="login-form space-y-5">
                      {/* Email Field */}
                      <div className="form-group flex flex-col relative pb-5">
                        <div className="relative">
                          <div className="icon absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-600">
                            <LuMail />
                          </div>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className="w-full pl-10 pr-4 py-4 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="Email"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-red-500 text-sm absolute right-0 bottom-0"
                        />
                      </div>
                      {/* Password Field */}
                      <div className="form-group flex flex-col relative pb-5">
                        <div className="relative">
                          <div className="icon absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-600">
                            <LuLock/>
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
                      <div className="forgot text-right">
                        <Link
                          to="/forget-password"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <button
                        type="submit"
                        className={`w-full py-4 bg-blue-600 rounded-full text-white font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isSubmitting && "cursor-not-allowed opacity-70"}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="loader py-2 flex justify-center">
                            <ThreeDots height={8} color="white" />
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
                <p className="text-center text-gray-600 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
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

export default Signin;
