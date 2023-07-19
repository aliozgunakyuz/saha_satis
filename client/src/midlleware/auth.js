import {Navigate} from "react-router-dom"
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({children}) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}


export const RouteProtection = ({children}) => {
    const mail = useAuthStore.getState().auth.mail;
    if(!mail){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}