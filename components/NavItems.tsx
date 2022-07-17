const NavItems = ({ sidebar }: { sidebar: boolean }) => {
  return (
    <ul className={`flex items-center  gap-4 ${sidebar ? "flex-col p-4" : ""}`}>
      <li>Our story</li>
      <li>Membership</li>
      <li>Write</li>
      <li>Sign In</li>
      <li className="cursor-pointer bg-black py-2 px-4 text-white rounded-full">
        Get started
      </li>
    </ul>
  );
};
export default NavItems;
