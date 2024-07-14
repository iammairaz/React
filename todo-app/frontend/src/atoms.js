import { atom } from "recoil";

export const activePageState = atom({
    key: "activePageState",
    default: "/"
})

export const loginState = atom({
    key: 'loginState',
    default: {
      isLoggedIn: false,
      token: null,
      error: null,
    },
  });