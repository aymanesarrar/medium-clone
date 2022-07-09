import { NextPage } from "next";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";

const Register: NextPage = () => {
  const [rEmail, setREmail] = useState(false);
  const handleEmail: MouseEventHandler = (e) => {
    e.preventDefault();
    setREmail(!rEmail);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full mx-auto">
        {!rEmail ? (
          <form className="md:mx-auto flex flex-col text-center gap-4 border-[1px] border-black py-28 px-6 rounded-lg shadow-xl md:w-1/2">
            <h1 className="text-2xl">Join Medium</h1>
            <button className="text-black border-[1px] border-black rounded-xl py-1 hover:translate-y-1 hover:scale-105 transition-all duration-300">
              Sign Up with Google
            </button>
            <button className="text-black border-[1px] border-black rounded-xl py-1 hover:translate-y-1 hover:scale-105 transition-all duration-300">
              Sign Up with Facebook
            </button>
            <button
              onClick={handleEmail}
              className="text-black border-[1px] border-black rounded-xl py-1 hover:translate-y-1 hover:scale-105 transition-all duration-300"
            >
              Sign Up with email
            </button>
            <p>
              Already have an account?
              <Link href="/login">
                <a className="text-green-700">Sign in</a>
              </Link>
            </p>
          </form>
        ) : (
          <form className="flex flex-col gap-4 md:w-1/2 mx-auto border-[1px] border-black py-28 px-8 rounded-lg shadow-xl">
            <h1 className="text-2xl text-center">Join Medium</h1>
            <label className="flex flex-col gap-2 md:w-1/2 md:mx-auto">
              email:
              <input
                type="email"
                className="px-2 border-b-[1px] outline-none border-b-black pb-1"
              />
            </label>
            <label className="flex flex-col gap-2 md:w-1/2 md:mx-auto">
              password:
              <input
                type="password"
                className="px-2 border-b-[1px] outline-none border-b-black pb-1"
              />
            </label>
            <button className="py-1 text-white bg-black md:w-1/2 md:mx-auto rounded-2xl">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Register;
