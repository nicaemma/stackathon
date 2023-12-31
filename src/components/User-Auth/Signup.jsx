import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from "../../context/AuthContext";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch {
      setError("Failed to create user");
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-max font-fira bg-cover bg-no-repeat md:bg-[url('/img/background3.png')]">
      <div className="w-full h-max bg-cover bg-white bg-opacity-30">
        <div className="py-10">
          <div className="max-w-[500px] rounded-sm mx-auto bg-white p-8">
            <div>
              <h1 className="text-2xl font-bold pb-2">
                Sign up for an account
              </h1>
              <p className="py-2">
                {" "}
                Already have an account?{" "}
                <Link to="/signin" className="underline">
                  Sign in.
                </Link>
              </p>
              {error && <div>{error}</div>}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col py-2">
                <label className="py-2 font-medium">Name</label>
                <input ref={nameRef} className="border p-3" type="name" />
              </div>
              <div className="flex flex-col py-2">
                <label className="py-2 font-medium">Email Address</label>
                <input ref={emailRef} className="border p-3" type="email" />
              </div>
              <div className="flex flex-col py-2">
                <label className="py-2 font-medium">Password</label>
                <input
                  ref={passwordRef}
                  className="border p-3"
                  type="password"
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="py-2 font-medium">Confirm Password</label>
                <input
                  ref={passwordConfirmRef}
                  className="border p-3"
                  type="password"
                />
              </div>
              <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
