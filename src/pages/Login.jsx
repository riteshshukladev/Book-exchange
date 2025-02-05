import React from "react";
import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../components/layout/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <div className="text-left flex flex-col mb-4 px-6 py-4">
        <h2
          className="text-black font-josephine text-2xl md:text-3xl font-semibold"
        >
          Welcome Aboard!!
        </h2>
        <p className=" text-gray-800 font-kreon text-base font-normal">Logging in...</p>
      </div>

      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
