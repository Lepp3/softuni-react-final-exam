import { createContext } from "react";

export const UserContext = createContext({
    _id: '',
    email: '',
    accessToken: '',
    userLoginHandler: ()=>null,
})