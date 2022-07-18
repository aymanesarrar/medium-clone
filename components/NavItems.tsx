import Router from "next/router";

const NavItems = ({ sidebar }: { sidebar: boolean }) => {
  const redirectUser = (path: string) => {
    Router.push(path);
  };
  return (
    <ul className={`flex items-center  gap-4 ${sidebar ? "flex-col p-4" : ""}`}>
      <li className="cursor-pointer hover-1   rounded-full">Our story</li>
      <li className="cursor-pointer hover-1   rounded-full">Membership</li>
      <li className="cursor-pointer hover-1  rounded-full">Write</li>
      <li
        className="cursor-pointer hover-1  rounded-full"
        onClick={() => redirectUser("/login")}
      >
        Sign In
      </li>
      <li
        onClick={() => redirectUser("/register")}
        className="cursor-pointer bg-black py-2 px-4 text-white rounded-full"
      >
        Get started
      </li>
    </ul>
  );
};
export default NavItems;
