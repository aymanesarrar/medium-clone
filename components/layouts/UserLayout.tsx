import { AnimatePresence, motion } from "framer-motion";
import { InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRecoilState } from "recoil";
import { getServerSideProps } from "../../pages";
import { navItems } from "../../utils/states";
import useScreen from "../hooks/useScreen";
import useSidebar from "../hooks/useSidebar";
import MediumLogo from "../MediumLogo";
import NavItems from "../NavItems";

export const UserLayout = ({
  children,
  user,
}: {
  children: JSX.Element;
  user: InferGetServerSidePropsType<typeof getServerSideProps>;
}) => {
  const windowWidth = useScreen();
  const { sidebar, openSidebar, closeSidebar } = useSidebar();
  const [items, setItems] = useRecoilState(navItems);
  useEffect(() => {
    if (windowWidth && windowWidth > 667) {
      closeSidebar();
    }
  }, [windowWidth, closeSidebar]);
  useEffect(() => {
    if (user) {
      setItems(false);
    }
  }, [user, setItems]);
  return (
    <div className="relative max-w-5xl min-h-screen">
      <header className="bg-[#FFc016] border-b-[1.5px] border-b-black p-5 flex items-center justify-between w-screen">
        <div className="flex items-center justify-between  w-full lg:w-[70%] mx-auto sticky">
          <MediumLogo />
          {windowWidth && windowWidth <= 667 ? (
            !sidebar && (
              <GiHamburgerMenu
                onClick={openSidebar}
                className="transition-all duration-300 cursor-pointer hover:scale-105"
              />
            )
          ) : (
            <NavItems items={items} sidebar={sidebar} />
          )}
          <AnimatePresence>
            {sidebar && (
              <motion.div
                initial={{ right: -500 }}
                animate={{ right: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ right: -500 }}
                className="fixed inset-y-0 right-0 w-1/2 bg-gradient-to-br from-[#f9c945] to-[#ffc116] p-6"
              >
                <NavItems sidebar={sidebar} items={items} />
                <AiOutlineClose
                  onClick={closeSidebar}
                  className="absolute cursor-pointer top-2 right-4"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      {children}
    </div>
  );
};
