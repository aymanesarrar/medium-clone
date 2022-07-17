import { useEffect, useState } from "react";

type width = number | undefined;
const useScreen = () => {
  const [width, setWidth] = useState<width>(undefined);
  useEffect(() => {
    function handleResize(): void {
      setWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return width;
};
export default useScreen;
