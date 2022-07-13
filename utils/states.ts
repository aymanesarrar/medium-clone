import { atom } from "recoil";

const messageState = atom({
  key: "messageState",
  default: "",
});
export { messageState };
