import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { auth } = useSelector((state) => ({...state}));

    return auth && auth.token ? 
    <Outlet/> :
    <Navigate to="/login"/>
}

export default PrivateRoute;