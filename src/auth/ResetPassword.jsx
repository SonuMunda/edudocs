import { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../store/slices/authSlice";
import FormResponseMessage from "../components/FormResponseMessage";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    message: "",
    success: null
  });


  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

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
    confirmPassword: Yup.string().required("Confirm password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password mismatched"
      )
      .trim(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await dispatch(
        resetPassword({ token, newPassword: values.password, navigate })
      ).unwrap();

      setApiResponse({
        message: data.message,
        success: true
      })
    } catch (error) {
      console.log(error);
      setApiResponse({
        message: error.message,
        success: false
      })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="password-reset h-screen flex sm:items-center">
        <div className="container max-w-7xl mx-auto p-4">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 space-y-10">
            <div className="overview">
              <h2 className="text-2xl font-bold">Reset Password</h2>
              <p className="text-neutral-600">
                Enter your new password below to reset your password.
              </p>
            </div>

            {
              apiResponse.message &&
              <FormResponseMessage apiResponse={apiResponse} />
            }

            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="reset-password-form space-y-3">
                  <div className="form-group flex flex-col relative pb-6">
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="New password"
                        className="w-full p-3 rounded-full ring-1 ring-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
                      />
                      <div
                        className="icon absolute top-1/2 -translate-y-1/2 right-0 p-2 text-xl"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <LuEyeClosed /> : <LuEye />}
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs absolute bottom-0 left-6"
                    />
                  </div>
                  <div className="form-group flex flex-col relative pb-6">
                    <div className="relative">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        className="w-full p-3 rounded-full ring-1 ring-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
                      />
                      <div
                        className="icon absolute top-1/2 -translate-y-1/2 right-0 p-2 text-xl"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <LuEyeClosed /> : <LuEye />}
                      </div>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-xs absolute bottom-0 left-6"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full my-6 p-3 bg-blue-600 rounded-full hover:bg-blue-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${isSubmitting && "cursor-not-allowed"
                      }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
