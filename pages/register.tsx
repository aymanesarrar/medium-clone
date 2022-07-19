import { GetServerSideProps, NextPage } from "next";
import cookies from "next-cookies";
import Link from "next/link";
import Router from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Form from "../components/layouts/Form";
import { supabase } from "../utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = cookies(context);
  if (typeof cookie["x-access-token"] !== "undefined") {
    const { user } = await supabase.auth.api.getUser(cookie["x-access-token"]);
    if (user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
        props: {
          user,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } else {
    return {
      props: {},
    };
  }
};

const Register: NextPage = (props) => {
  const [rEmail, setREmail] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["x-access-token"]);
  const handleEmail: MouseEventHandler = (e) => {
    e.preventDefault();
    setREmail(!rEmail);
  };
  useEffect(() => {
    const redirectUser = async () => {
      const { user, error } = await supabase.auth.api.getUser(
        cookies["x-access-token"]
      );
      if (!error) {
        Router.push("/");
      }
    };
    redirectUser();
  }, [cookies]);
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
          <Form title="Sign Up" />
        )}
      </div>
    </div>
  );
};
export default Register;
