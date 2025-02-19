import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  localStorage.setItem("resetToken", token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [token]);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("New password is required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .trim(),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        'Must match "New password" field value'
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
        autoClose: 1000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="password-reset sm:p-4">
        <div className="w-full max-w-xl m-auto bg-white p-8 rounded sm:border">
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
                      className="w-full p-3 rounded ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
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
                      className="w-full p-3 rounded ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
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
                  className={`w-full my-6 p-3 bg-blue-600 rounded hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${
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
