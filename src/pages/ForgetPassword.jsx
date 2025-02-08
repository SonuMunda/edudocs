import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { forgetPassword } from "../store/slices/authSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, setSubmitting) => {
    try {
      if (values.email) {
        await dispatch(forgetPassword({ email: values.email, toast }));
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="px-4 py-10 sm:p-10">
      <section className="forget-password flex justify-center">
        <ToastContainer />
        <div className="container max-w-2xl mt-14 bg-white p-10 ring ring-gray-200 rounded-3xl">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email()
                .trim()
                .lowercase()
                .required("Email is required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              await handleSubmit(values, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <h2 className="text-3xl font-bold text-3xl font-bold mb-1 lg:my-4">
                  Forget Password
                </h2>
                <p className="text-gray-600">
                  Provide the email address associated with your account to
                  recover your password.
                </p>
                <div className="form-group flex flex-col relative py-5 mt-10">
                  <label htmlFor="email" className="email-label">
                    <span className="text-gray-800">Email</span>
                    <span className="text-red-600">*</span>
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
                <button
                  type="submit"
                  className={`w-full bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-600 ${
                    isSubmitting ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Sending Mail..."
                    : "Recover Password"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-10 flex gap-4 justify-end">
            <Link to="/signin" className="text-gray-600">
              Login
            </Link>
            <Link to="/signup" className="text-gray-600">
              Signup
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgetPassword;
