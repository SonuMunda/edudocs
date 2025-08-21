import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../store/slices/authSlice";
import { useState } from "react";
import FormResponseMessage from "../components/FormResponseMessage";

const ForgetPassword = () => {
  const [apiResponse, setApiResponse] = useState({
    message: "",
    success: null
  })
  const dispatch = useDispatch();

  const handleSubmit = async (values, setSubmitting) => {
    try {
      if (values.email.trim()) {
        const data = await dispatch(forgetPassword({ email: values.email })).unwrap();
        setApiResponse({
          message: data.message,
          success: true
        })
      }
    } catch (error) {
      setApiResponse({
        message: error.message,
        success: false,
      })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="main">
      <section className="forget-password h-screen flex sm:items-center">
        <div className="container max-w-7xl p-4 mx-auto">
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
              <div className="form-container max-w-2xl mx-auto rounded-3xl p-6 sm:p-10 bg-white space-y-6 overflow-hidden">
                <div className="overview">
                  <h2 className="text-3xl font-bold text-3xl font-bold">
                    Forget Password
                  </h2>
                  <p className="text-neutral-600">
                    Provide the email address associated with your account to
                    recover your password.
                  </p>
                </div>
                {
                  apiResponse.message &&
                  <FormResponseMessage apiResponse={apiResponse} />
                }
                <Form className="form">
                  <div className="form-group flex flex-col relative pb-5">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-2 py-3 rounded-full ring-1 ring-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs absolute bottom-0 left-4"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full my-6 p-3 bg-blue-600 rounded-full hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${isSubmitting ? "cursor-not-allowed" : ""
                      }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending Mail..." : "Recover Password"}
                  </button>
                </Form>

                {/* Navigation btns */}
                <div className="flex gap-4 justify-end">
                  <Link to="/signin" className="text-neutral-600 bg-neutral-100 hover:bg-neutral-200 py-2 px-4 rounded-full">
                    Sign In
                  </Link>
                  <Link to="/signup" className="text-neutral-600 bg-blue-100 hover:bg-blue-200 py-2 px-4 rounded-full">
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default ForgetPassword;
