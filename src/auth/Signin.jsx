import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import Logo from "../components/Logo";
import GoogleAuthSignin from "./GoogleAuthSignin";

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
      .email("- invalid format")
      .required("- is required")
      .trim(),
    password: Yup.string().required("- is required"),
  });

  return (
    <>
      <ToastContainer />
      <section className="login min-h-screen flex sm:items-center bg-gradient-to-b from-gray-800 to-blue-700 ">
        <div className="h-screen sm:h-full sm:max-w-md bg-white p-4 sm:p-8 rounded sm:border mx-auto">
          <div className="center">
            <Logo />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Sign In Now
          </h2>
          <p className="mt-3 text-lg text-gray-600 text-center sm:mt-5">
            Share and explore high-quality study resources with students.
          </p>

          <GoogleAuthSignin/>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="login-form">
                {/* Email Field */}
                <div className="form-group flex flex-col relative py-4">
                  <label
                    htmlFor="email"
                    className={`text-gray-800 font-semibold ${
                      touched.email && errors.email ? "text-red-500" : ""
                    }`}
                  >
                    Email
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
                      className="w-full pl-10 py-3 rounded ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-group flex flex-col relative py-4">
                  <label
                    htmlFor="password"
                    className={`text-gray-800 font-semibold ${
                      touched.password && errors.password ? "text-red-500" : ""
                    }`}
                  >
                    Password
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="ms-1 text-red-500 text-sm italic"
                    />
                  </label>
                  <div className="relative">
                    <div className="icon absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-600">
                      <MdLock />
                    </div>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="w-full pl-10 py-3 rounded ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
                      placeholder="Password"
                    />
                    <div
                      className="icon absolute top-1/2 -translate-y-1/2 right-3 text-xl text-gray-600 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                  <Link
                    to="/forget-password"
                    className="text-blue-800 mt-1 hover:underline"
                  >
                    Forget Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`w-full my-6 p-3 bg-blue-600 rounded hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${
                    isSubmitting && "cursor-not-allowed"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center">
            <span className="text-gray-600">Don&apos;t have an account?</span>
            <Link to="/signup" className="text-blue-800 ms-1">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signin;
