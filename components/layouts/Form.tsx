import { FormProps, Inputs } from "../../types/interfaces/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { authenticationShema } from "../../schema/joi";
import Router from "next/router";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { messageState } from "../../utils/states";
import { motion } from "framer-motion";

const Form = ({ title }: FormProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(["x-access-token"]);
  const [message, setMessage] = useRecoilState(messageState);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = authenticationShema.validate(data);
    if (error) console.log(error);
    else {
      if (title === "Sign Up") {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (res.hasOwnProperty("message")) setMessage(res.message);
        Router.push("/login");
      } else {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (!res.access_token) setMessage(res.msg);
        else setCookie("x-access-token", res.access_token);
      }
    }
  };
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 md:w-1/2 mx-auto border-[1px] border-black py-28 px-8 rounded-lg shadow-xl"
    >
      <h1 className="text-2xl text-center">Join Medium</h1>
      <label className="flex flex-col gap-2 lg:w-1/2 lg:mx-auto">
        email:
        <input
          {...register("email")}
          type="email"
          className="px-2 border-b-[1px] outline-none border-b-black pb-1"
        />
      </label>
      <label className="flex flex-col gap-2 lg:w-1/2 lg:mx-auto">
        password:
        <input
          {...register("password")}
          type="password"
          className="px-2 border-b-[1px] outline-none border-b-black pb-1"
        />
      </label>
      <button className="py-1 text-white transition-all duration-300 bg-black md:w-1/2 md:mx-auto rounded-2xl hover:scale-105 hover:translate-y-1 hover:bg-zinc-900">
        {title}
      </button>
    </motion.form>
  );
};
export default Form;
