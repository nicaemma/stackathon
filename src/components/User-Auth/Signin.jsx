import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = UserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to login");
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen font-fira bg-cover bg-no-repeat md:bg-[url('/img/background3.png')]">
      <div className="w-full h-screen bg-cover bg-white bg-opacity-30">
        <div className="py-10">
          <div className="max-w-[500px] rounded-sm mx-auto bg-white p-8">
            <div>
              <h1 className="text-2xl font-bold py-2">
                Sign into your account
              </h1>
              <p className="py-2">
                {" "}
                Don't have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up.
                </Link>
              </p>
            </div>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
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
              <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
                Sign In
              </button>
            </form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
