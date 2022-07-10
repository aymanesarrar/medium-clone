import { FormProps, Inputs } from "../../types/interfaces/login";
import { useForm, SubmitHandler } from "react-hook-form";
import { authenticationShema } from "../../schema/joi";

const Form = ({ title }: FormProps) => {
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
        console.log(response);
      }
    }
  };
  return (
    <form
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
    </form>
  );
};
export default Form;
