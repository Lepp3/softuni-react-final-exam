import { createContext } from "react";

export const UserContext = createContext({
    userId: '',
    email: '',
    authToken: '',
    userLoginHandler: ()=>null,
})