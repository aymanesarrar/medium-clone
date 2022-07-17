const NavItems = ({ sidebar }: { sidebar: boolean }) => {
  return (
    <ul className={`flex items-center  gap-4 ${sidebar ? "flex-col p-4" : ""}`}>
      <li className="cursor-pointer">Our story</li>
      <li className="cursor-pointer">Membership</li>
      <li className="cursor-pointer">Write</li>
      <li className="cursor-pointer">Sign In</li>
      <li className="cursor-pointer bg-black py-2 px-4 text-white rounded-full">
        Get started
      </li>
    </ul>
  );
};
export default NavItems;
