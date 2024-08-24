import React from "react";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { loginAuth } from "../../store/authStore";
import { LoginHelper } from '../../services/authService';


const LoginForm = () => {
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
    mutationFn:LoginHelper,
    onSuccess: (data) => {},

    onError: (err) => {
      setError(err.response?.data?.message || "Login failed");
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const validateData = await validateSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      mutation.mutate(validateData);
    } catch (validationErrors) {
      console.log(validationErrors);
      if (validationErrors instanceof Yup.ValidationError) {
        setError(validationErrors.errors.join(', '));
    } else {
        setError('An unexpected error occurred');
    }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && error.includes("email") && <pre>{error}</pre>}
      </div>

      <div>
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && error.includes("password") && <pre>{error}</pre>}
      </div>

      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Logging in..." : "Login"}
      </button>

      {error && !error.includes('email') && !error.includes('password') && (
        <pre>{ error}</pre>
      )}
    </form>
  );
};

export default LoginForm;
