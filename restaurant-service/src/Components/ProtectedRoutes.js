import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
export const  token = localStorage.getItem('token')
export const useAuth = () => {
    const  token = localStorage.getItem('token')
    if (token){
        return true;
    }
    const loggedin = false;
    return loggedin;
}
export const useAdmin = () => {
    const admin = false;
    const  token = localStorage.getItem('token')
    const isAdmin = localStorage.getItem('role')
    if (token && isAdmin=='admin' ){
        return true;
    }
    return admin;
}
function ProtectedRoutes() {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
export const  ProtectedRoutesForAdmin = ()=> {
    const isAdmin = useAdmin();
    return isAdmin ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoutes