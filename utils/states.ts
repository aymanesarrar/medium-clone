import { atom } from "recoil";

const messageState = atom({
  key: "messageState",
  default: "" as string,
});
const userAuth = atom({
  key: "userAuth",
  default: false as boolean,
});
const navItems = atom({
  key: "navItems",
  default: true as boolean,
});
export { messageState, userAuth, navItems };
