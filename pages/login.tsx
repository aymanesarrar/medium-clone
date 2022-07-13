import { NextPage } from "next";
import { MouseEventHandler, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Form from "../components/layouts/Form";
import Modal from "../components/Modal";
import { messageState } from "../utils/states";

const Login: NextPage = () => {
  const [rEmail, setREmail] = useState(false);
  const [registerMessage, setRegisterMessage] = useRecoilState(messageState);
  const handleEmail: MouseEventHandler = (e) => {
    e.preventDefault();
    setREmail(!rEmail);
  };
  const handleCloseModal = () => {
    setRegisterMessage("");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full mx-auto">
        <Modal onClose={handleCloseModal} show={registerMessage.length !== 0}>
          <h1>{registerMessage}</h1>
        </Modal>
        {!rEmail ? (
          <form className="md:mx-auto flex flex-col text-center gap-4 border-[1px] border-black py-28 px-6 rounded-lg shadow-xl md:w-1/2">
            <h1 className="text-2xl">Join Medium</h1>
            <button className="text-black border-[1px] border-black rounded-xl py-1 hover:translate-y-1 hover:scale-105 transition-all duration-300">
              Sign In with Google
            </button>
            <button className="text-black border-[1px] border-black rounded-xl py-1 hover:translate-y-1 hover:scale-105 transition-all duration-300">
              Sign In with Facebook
            </button>
            <button
              onClick={handleEmail}
              className="text-black border-[1px] border-black rounded-xl py-1 hover:translate-y-1 hover:scale-105 transition-all duration-300"
            >
              Sign In with email
            </button>
          </form>
        ) : (
          <Form title="Sign In" />
        )}
      </div>
    </div>
  );
};

export default Login;