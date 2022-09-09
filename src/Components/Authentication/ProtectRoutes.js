
import { BrowserRouter as Route,  Outlet,Navigate } from 'react-router-dom'
import LoginComponent from "./LoginComponent";

let count=0;
export default function ProtectedRoutes  ({ Children })  {

    let auth = sessionStorage.getItem('autherization')
    count++;
    console.log(count);

    return auth ?  Children: <Navigate to="/login" />;
}
