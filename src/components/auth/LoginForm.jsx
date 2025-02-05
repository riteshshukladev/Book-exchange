import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { loginAuth } from "../../store/authStore";
import { AuthHelper } from "../../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import arrowImg from "../../assets/icons/arrow1.svg";

import { isAuthenticated } from "../../services/protectedAuthService.js";
const LoginForm = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const [isCheckingAuth, setCheckingAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setCheckingAuth(true);
        const isAuthed = await isAuthenticated();

        if (isAuthed) {
          navigate("/books");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const {
    email,
    password,
    setEmail,
    setPassword,
    setUser,
    setError,
    error,
    isLoading,
    setIsLoading,
  } = loginAuth();

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
      if (data.status === 200) {
        // setUser(data.token);
        setIsLoading(false);

        navigate("/books", { replace: true });
      } else {
        setError({ general: "Login failed" });
        setIsLoading(false);
      }
    },
    onError: (err) => {
      setError({ general: err?.message || "Login failed" });
      setIsLoading(false);
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const abortController = new AbortController();
    try {
      const validateData = await validateSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      await mutation.mutateAsync({
        actionType: "login",
        data: validateData,
        signal: abortController.signal,
      });
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const errorObject = {};
        validationErrors.inner.forEach((error) => {
          errorObject[error.path] = error.message;
        });
      } else {
        setError({ general: "An unexpected error occurred" });
      }
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-700">
              Verifying authentication...
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col ">
      <form onSubmit={handleLoginSubmit} className="space-y-6 mb-2 px-6">
        <div>
          <label
            htmlFor="email"
            className="block text-base font-normal font-kreon text-grey-800"
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
              className="appearance-none block w-full py-1 bg-transparent border-0 border-b-2 border-black  focus:outline-none transition-colors text-xl font-normal font-kreon"
            />
          </div>

          {error.email && (
            <p className="mt-2 text-sm text-red-600">{error.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-base font-normal font-kreon text-grey-800"
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
              className="appearance-none block w-full py-1 bg-transparent border-0 border-b-2 border-black  focus:outline-none transition-colors text-xl font-normal font-kreon"
            />
          </div>
          {error.password && (
            <p className="mt-2 text-sm text-red-600">{error.password}</p>
          )}
        </div>

        <div className="text-sm text-right">
          <Link
            to="/signup"
            className=" border-b-2 border-black  transition-colors text-sm font-normal font-kreon"
          >
            Sign up
          </Link>
        </div>

        {error.general && (
          <p className="mt-2 text-sm text-red-600">{error.general}</p>
        )}
      </form>
      <div className="pt-3">
        <button
          type="submit"
          disabled={mutation.isLoading}
          onClick={handleLoginSubmit}
          className={`w-full flex flex-row justify-between px-6 py-4 rounded-lg
            transition-colors duration-100
            ${
              mutation.isLoading
                ? "cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
            }`}
        >
          <span className="text-xl font-normal font-kreon text-black">
            {mutation.isLoading ? "Logging in..." : "Proceed"}
          </span>
          <img
            src={arrowImg}
            alt="Proceed arrow"
            
          />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
