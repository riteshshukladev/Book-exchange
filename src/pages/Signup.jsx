


import React from "react";
import SignUpForm from "../components/auth/SignUpForm";
import AuthLayout from "../components/layout/AuthLayout";

const Signup = () => {
  return (

    <AuthLayout>
      <div className="text-left flex flex-col gap-1 mb-4 px-6 py-4">
        <h2 className="text-black font-josephine text-2xl md:text-3xl font-semibold0">
          Welcome Aboard!!
        </h2>
        <p className="text-gray-800 font-kreon text-base font-normal">
         Signning up...
        </p>
      </div>
      <SignUpForm/>
    </AuthLayout>
  );
};

export default Signup;
