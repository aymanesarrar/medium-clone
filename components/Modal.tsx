import { ModalProps } from "../types/interfaces/utils";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Coding from "./illustrations/Coding";
const Modal = ({ children, show, onClose }: ModalProps) => {
  if (show)
    return createPortal(
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-transparent"
        >
          <div className="relative flex flex-col items-center justify-center w-full p-5 font-semibold text-black md:w-1/2 bg-zinc-400 rounded-xl">
            <div
              onClick={onClose}
              className="absolute cursor-pointer top-5 right-10"
            >
              <div>
                <h1 className="font-bold text-center transition-all duration-300 border-2 border-black rounded-full w-7 h-7 font-xl hover:scale-105 hover:translate-y-1">
                  x
                </h1>
              </div>
            </div>
            <Coding />
            {children}
          </div>
        </motion.div>
      </AnimatePresence>,
      document.getElementById("__next") as HTMLElement
    );
  else return null;
};
export default Modal;
