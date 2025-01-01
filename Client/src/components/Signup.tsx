import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const localhostURL = import.meta.env.VITE_LIVE_URL;

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const { name, email, password } = values; // Exclude confirmPassword
    try {
      const response = await axios.post(`${localhostURL}/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Signup successful! Please log in.");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred.");
        console.error("Signup error:", error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 text-transparent bg-clip-text">
            Sign Up for SocialFeed
          </h2>
          <p className="mt-2 text-gray-400">
            Join SocialFeed and connect with the world!
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className={`w-full px-3 py-2 bg-gray-800 border ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-full text-white`}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className={`w-full px-3 py-2 bg-gray-800 border ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-full text-white`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`w-full px-3 py-2 bg-gray-800 border ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-full text-white`}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={`w-full px-3 py-2 bg-gray-800 border ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-full text-white`}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-150 ease-in-out"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
