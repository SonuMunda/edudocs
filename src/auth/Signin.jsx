import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
      .email("Invalid email format")
      .required("Email is required")
      .trim(),
    password: Yup.string().required("Password is required"),
  });

  return (
    <main className="min-h-screen center py-10">
      <ToastContainer />
      <section className="login w-full center p-4">
        <div className="h-full w-full sm:w-96 bg-white p-8 rounded-3xl ring ring-gray-300">
          <h2 className="text-3xl font-semibold text-center text-blue-500 my-4">
            Login
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="login-form">
                <div className="form-group flex flex-col relative py-4">
                  <label htmlFor="email" className="text-gray-700">
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
                    className="text-red-500 text-xs absolute bottom-0"
                  />
                </div>
                <div className="form-group flex flex-col relative py-4">
                  <label htmlFor="password" className="text-gray-700">
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
                      className="icon absolute top-1/2 -translate-y-1/2 right-0 p-2 text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs absolute bottom-0"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full my-6 py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${
                    isSubmitting && "cursor-not-allowed"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

                <Link
                  to="/forget-password"
                  className="text-blue-800 center mb-2"
                >
                  Forget Password?
                </Link>

                <p className="text-center">
                  Don&apos;t have an account?
                  <Link to="/signup" className="text-blue-800 ms-1">
                    Sign up
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default Signin;
