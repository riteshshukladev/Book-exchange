import React from "react";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { loginAuth } from "../../store/authStore";

const LoginForm = () => {
  const { email, password, setEmail, setPassword, setError} = loginAuth();
  
  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email Address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
  })

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const validateData = await validateSchema.validate({ email, password }, { abortEarly: false });
    }
    catch (err) {
      console.log(errors)
      setError(err.errors.join(','));
    }
  }


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
      </div>

      <button type="submit" >

      </button>
    </form>
  );
};

export default LoginForm;
