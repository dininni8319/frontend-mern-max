import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedin: false,
  userId: null,
  token: null,
  name: null,
  login: () => {}, 
  logout: () => {}
});
