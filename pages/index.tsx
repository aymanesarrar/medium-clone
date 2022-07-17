import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import MediumLogo from "../components/MediumLogo";
import { GiHamburgerMenu } from "react-icons/gi";
import useScreen from "../components/hooks/useScreen";
import { AiOutlineClose } from "react-icons/ai";
import useSidebar from "../components/hooks/useSidebar";
import NavItems from "../components/NavItems";
import { AnimatePresence, motion } from "framer-motion";

const Home: NextPage = () => {
  const windowWidth = useScreen();
  const { sidebar, openSidebar, closeSidebar } = useSidebar();
  useEffect(() => {
    if (windowWidth && windowWidth > 667) {
      closeSidebar();
    }
  }, [windowWidth, closeSidebar]);
  return (
    <div className="min-h-screen max-w-5xl  relative">
      <Head>
        <title>Medium</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b-[1.5px] border-b-black p-5 flex items-center justify-between w-screen">
        <div className="flex items-center justify-between  w-full lg:w-[70%] mx-auto sticky">
          <MediumLogo />
          {windowWidth && windowWidth <= 667 ? (
            <GiHamburgerMenu
              onClick={openSidebar}
              className="cursor-pointer  hover:scale-105 transition-all duration-300"
            />
          ) : (
            <NavItems sidebar={sidebar} />
          )}
          <AnimatePresence>
            {sidebar && (
              <motion.div
                initial={{ right: -500 }}
                animate={{ right: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ right: -500 }}
                className="fixed inset-y-0 right-0 w-1/2 bg-[#FFC016] p-6"
              >
                <NavItems sidebar={sidebar} />
                <AiOutlineClose
                  onClick={closeSidebar}
                  className="absolute top-2 right-4 cursor-pointer"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  );
};

export default Home;
