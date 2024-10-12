import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import sideimage from "../assets/images/side_image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    dispatch(login({ data: values, toast, navigate }));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .trim(),
    password: Yup.string().required("Password is required"),
  });

  return (
    <main className="h-screen center bg-indigo-200">
      <ToastContainer />
      <section className="flex w-10/12 max-w-4xl shadow-lg bg-white  overflow-hidden mt-10 mx-auto lg:w-3/4 sm:w-5/6">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ background: `url(${sideimage}) center center/cover` }}
        ></div>
        <div className="h-full w-full p-8 lg:w-1/2 overflow-y-auto scrollbar-hidden">
          <h2 className="text-3xl font-bold text-indigo-400 my-4">
            Welcome back!
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form className="login-form">
              <div className="form-group flex flex-col relative py-4">
                <label htmlFor="email" className="  text-gray-700">
                  Email
                </label>

                <Field
                  type="email"
                  name="email"
                  id="email"
                  className=" p-2 border focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs font-semibold absolute bottom-0"
                />
              </div>
              <div className="form-group flex flex-col relative py-4">
                <label htmlFor="password" className=" text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className=" p-2 border focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs font-semibold absolute bottom-0"
                />
              </div>

              <button
                type="submit"
                className="w-full my-6 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold  shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                Login
              </button>

              <p className="text-center">
                Don&apos;t have an account?
                <Link to="/signup" className="text-indigo-800 ms-1">
                  Sign up
                </Link>
              </p>

              {/* <p className="text-center">Or continue with</p> */}
            </Form>
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default Login;
