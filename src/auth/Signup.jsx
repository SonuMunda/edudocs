import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { signup } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";

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
      .min(8, "Password to short")
      .max(20, "Password to long")
      .trim(),
  });

  return (
    <main className="min-h-screen px-4 py-10 sm:p-10 center">
      <ToastContainer />
      <div className="flex flex-col w-10/12 lg:flex-row gap-10 w-full lg:max-w-4xl bg-white shadow mt-14 mx-auto rounded-3xl overflow-hidden">
        <div className="center flex-col lg:w-1/2 bg-blue-500 lg:rounded-r-3xl p-10 ">
          <h2 className="text-3xl font-bold mb-2 text-center text-white">
            Welcome to Edudocs!
          </h2>
          <p className="text-white text-center mb-1">
            Provide your details to create an account.
          </p>
          <Link
            to="/login"
            className="border-2 border-white text-white py-2 px-6 rounded-full hidden lg:block"
          >
            Login
          </Link>
        </div>
        <div className="h-full overflow-y-auto scrollbar-hide w-full px-6 py-4 lg:w-1/2">
          <h2 className="text-3xl font-semibold mb-4 text-blue-500 text-3xl font-bold  lg:my-4  ">
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
              try {
                await handleSubmit(values);
              } catch (error) {
                toast.error(error.message, {
                  position: "top-center",
                });
              } finally {
                setSubmitting(false);
              }
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
                    className=" p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 "
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
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className=" p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
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
                  {isSubmitting ? (
                    <span className="center py-1">
                      <ThreeDots color="#fff" height={12} width={30} />
                    </span>
                  ) : (
                    "Signup"
                  )}
                </button>

                <p className="text-center my-2">
                  Already have an account?
                  <Link to="/login" className="text-blue-800 ms-1">
                    Login
                  </Link>
                </p>

                {/* <p className="text-center">Or continue with</p> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default Signup;
