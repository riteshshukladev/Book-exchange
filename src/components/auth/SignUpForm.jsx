import React,{useEffect, useMemo, useCallback} from "react";
import * as Yup from "yup";
import { signUpSchema } from "../../helpers/validationSchema";
import { useMutation } from "@tanstack/react-query";
import { AuthHelper } from "../../services/authService";
import { signUpAuth } from "../../store/authStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import arrowImg from "../../assets/icons/arrow1.svg";

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
    isLoading,
    setIsLoading,
  } = signUpAuth();

  // const { login } = useAuth();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: AuthHelper,
    onSuccess: useCallback(
      (data) => {
        setIsLoading(false);
        if (data.status === 200) {
          navigate("/home", { replace: true });
        }
      },
      [navigate, setIsLoading]
    ),
    onError: useCallback(
      (err) => {
        setError({ general: err.message || "Signup failed" });
        setIsLoading(false);
      },
      [setError, setIsLoading]
    ),
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
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
        setIsLoading(false);
      }
    },
    [
      username,
      email,
      password,
      confirmPassword,
      mutation,
      setError,
      setIsLoading,
    ]
  );

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="space-y-6 mb-2 px-6">
        <div>
          <label
            htmlFor="username"
            className="block text-base font-normal font-kreon text-grey-800"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="appearance-none block w-full py-1 bg-transparent border-0 border-b-2 border-black  focus:outline-none transition-colors text-xl font-normal font-kreon"
            />
          </div>
          {error.username && (
            <p className="mt-2 text-sm text-red-600">{error.username}</p>
          )}
        </div>

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
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full py-1 bg-transparent border-0 border-b-2 border-black  focus:outline-none transition-colors text-xl font-normal font-kreon"
            />
          </div>
          {error.email && (
            <p className="mt-2 text-sm text-red-600 font-kreon">
              {error.email}
            </p>
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
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full py-1 bg-transparent border-0 border-b-2 border-black  focus:outline-none transition-colors text-xl font-normal font-kreon"
            />
          </div>
          {error.password && (
            <p className="mt-2 text-sm text-red-600 font-kreon">
              {error.password}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-base font-normal font-kreon text-grey-800"
          >
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
              className="appearance-none block w-full py-1 bg-transparent border-0 border-b-2 border-black  focus:outline-none transition-colors text-xl font-normal font-kreon"
            />
          </div>
          {error.confirmPassword && (
            <p className="mt-2 text-sm text-red-600 font-kreon">
              {error.confirmPassword}
            </p>
          )}
        </div>

        <div className="text-sm text-right">
          <Link
            to="/"
            className=" border-b-2 border-black  transition-colors text-sm font-normal font-kreon"
          >
            Sign in
          </Link>
        </div>

        {error.general && (
          <p className="mt-2 text-sm text-red-600 font-kreon">
            {error.general}
          </p>
        )}
      </form>
      <div className="pt-3">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={mutation.isLoading}
          className={`w-full flex flex-row justify-between px-6 py-4 rounded-lg
            transition-colors duration-100
            ${
              mutation.isLoading
                ? "cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
            }`}
        >
          <span className="text-xl font-normal font-kreon text-black">
            {isLoading ? "Logging in..." : "Proceed"}
          </span>
          <img src={arrowImg} />
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
