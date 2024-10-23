import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import sideimage from "../assets/images/side_image.jpg";
import { Link } from "react-router-dom";
import { signup } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    dispatch(signup({ data: values, toast }));
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
      .required("First name is required").matches(nameRegex, "First name must be alphabets only").
      min(3, "First name to short")
      .max(20, "First name to long")
      .trim(),
    lastName: Yup.string()
      .required("Last name is required")
      .matches(nameRegex, "Last name must be alphabets only")
      .min(3, "First name to short")
      .max(20, "First name to long")
      .trim(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password to short")
      .max(20, "Password to long")
      .trim(),
  });

  return (
    <main className="min-h-screen p-10 center bg-indigo-200">
      <ToastContainer />
      <div
        className="flex w-11/12 max-w-4xl shadow-lg bg-white mt-14 mx-auto"
      >
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ background: `url(${sideimage}) center center/cover` }}
        ></div>
        <div className="h-full overflow-y-auto scrollbar-hide w-full px-6 py-4 lg:w-1/2">
          <h2 className="text-3xl font-bold text-indigo-400 my-6">
            Signup with Email
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
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form className="signup-form" autoComplete="off">
              <div className="form-group flex flex-col relative pb-6 my-2">
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className=" p-2 border focus:outline-none focus:ring-1 focus:ring-indigo-500 "
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs font-semibold absolute bottom-0"
                />
              </div>
              <div className="form-group flex flex-col relative pb-5 my-2">
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className=" p-2 border focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter your first name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs font-semibold absolute bottom-0"
                />
              </div>
              <div className="form-group flex flex-col relative pb-5 my-2">
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className=" p-2 border focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter your last name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs font-semibold absolute bottom-0"
                />
              </div>

              <div className="form-group flex flex-col relative pb-5 my-2">
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
              <div className="form-group flex flex-col relative pb-5 my-2">
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
                className="w-full my-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                Sign Up
              </button>

              <p className="text-center my-2">
                Already have an account?
                <Link to="/login" className="text-indigo-800 ms-1">
                  Login
                </Link>
              </p>

              {/* <p className="text-center">Or continue with</p> */}
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default Signup;
