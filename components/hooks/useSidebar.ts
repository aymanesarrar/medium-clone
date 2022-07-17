import { useState } from "react";

const useSidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const openSidebar = () => {
    setSidebar(true);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };
  return { sidebar, openSidebar, closeSidebar };
};
export default useSidebar;
