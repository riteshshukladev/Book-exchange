
import React from "react";
import * as Yup from "yup";
import { signUpSchema } from "../../helpers/validationSchema";
import { useMutation } from "@tanstack/react-query";
import { AuthHelper } from "../../services/authService";
import { signUpAuth } from "../../store/authStore";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const SignUpForm = () => {
  const {
    email,
    username,
    password,
    confirmPassword,
    error,
    setEmail,
    setPassword,
    setUser,
    setError,
    setUserName,
    setconfirmpassword,
  } = signUpAuth();

  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: AuthHelper,
    onSuccess: (data) => {
      setUser(data.name)
      login(data.name);
    },
    onError: (err) => {
      setError({ general: err.response?.data?.message || "Signup failed" });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validateData = await signUpSchema.validate(
        { username, email, password, confirmPassword },
        { abortEarly: false }
      );

      mutation.mutate({
        actionType: "signup",
        data: validateData,
      });
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error.username && <p className="mt-2 text-sm text-red-600">{error.username}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error.email && <p className="mt-2 text-sm text-red-600">{error.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error.password && <p className="mt-2 text-sm text-red-600">{error.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error.confirmPassword && <p className="mt-2 text-sm text-red-600">{error.confirmPassword}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {mutation.isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>

      <div className="text-sm">
        <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
          Already have an account? Sign in
        </Link>
      </div>

      {error.general && (
        <p className="mt-2 text-sm text-red-600">{error.general}</p>
      )}
    </form>
  );
};

export default SignUpForm;