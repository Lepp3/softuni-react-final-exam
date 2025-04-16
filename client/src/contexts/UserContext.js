import { createContext } from "react";

export const UserContext = createContext({
    userId: '',
    email: '',
    authToken: '',
    refreshToken: '',
    userLoginHandler: ()=>null,
    userLogoutHandler: ()=>null,
})