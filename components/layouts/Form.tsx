import { FormProps } from "../../types/interfaces/login";

const Form = ({ title }: FormProps) => {
  return (
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
        {title}
      </button>
    </form>
  );
};
export default Form;
