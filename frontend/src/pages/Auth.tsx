import { Navigate, Outlet } from "react-router-dom";


const useAuth =  () => {
    const token = localStorage.getItem("token");
    return {isAuthenticated:Boolean(token)};
}

export const Auth = () => {
    const {isAuthenticated} = useAuth();
  return isAuthenticated ? <Outlet/> : <Navigate to="signin" replace/>
}

