import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { token } = useParams();
  localStorage.setItem("token", token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(token);
  }, [token]);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .trim(),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        'Must match "new password" field value'
      )
      .trim(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        resetPassword({ newPassword: values.password, toast, navigate })
      );
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-10">
      <section className="password-reset mt-12 p-4">
        <div className="w-full max-w-xl m-auto bg-white p-8 rounded-3xl ring-2 ring-gray-200">
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <p className="mb-6 text-gray-600">
            Enter your new password below to reset your password.
          </p>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="reset-password-form">
                <div className="form-group flex flex-col relative py-6">
                  <label
                    htmlFor="password"
                    className="block  font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
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
                <div className="form-group flex flex-col relative py-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                    />
                    <div
                      className="icon absolute top-1/2 -translate-y-1/2 right-0 p-2 text-xl"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
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
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
