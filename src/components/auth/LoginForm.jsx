import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { loginAuth } from "../../store/authStore";
import { AuthHelper, isAuthenticated } from "../../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/add-book");
    }
  });
  const { email, password, setEmail, setPassword, setUser, setError, error } =
    loginAuth();

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const mutation = useMutation({
    mutationFn: AuthHelper,
    onSuccess: (data) => {
      setUser(data.token)
      login(data.token);
    },
    onError: (err) => {
      setError({ general: err.response?.data?.message  || "Login failed" });
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const validateData = await validateSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      console.log(validateData)
      mutation.mutate({ actionType: "login", data: validateData });
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const errorObject = {};
        validationErrors.inner.forEach((error) => {
          errorObject[error.path] = error.message;
        });
        setError(errorObject);
      } else {
        setError({ general: "An unexpected error occurred" });
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error.email && (
          <p className="mt-2 text-sm text-red-600">{error.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error.password && (
          <p className="mt-2 text-sm text-red-600">{error.password}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </div>

      <div className="text-sm">
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Don't have an account? Sign up
        </Link>
      </div>

      {error.general && (
        <p className="mt-2 text-sm text-red-600">{error.general}</p>
      )}
    </form>
  );
};

export default LoginForm;
