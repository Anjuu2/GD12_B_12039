import { Outlet } from "react-router-dom"; 

import TopNavbar from "../components/TopNavbar";  

const routes = [ 
    { 
        path: "/user", 
        name: "Home", 
    },
    { 
        path: "/user/content", 
        name: "My Videos", 
    },
    {
        path: "/user/watch-later",
        name: "Watch Later",
    }
]; 
    
const UserLayout = ({ children }) => { 
    return ( 
        <div className="mt-4 pt-5"> 
            <TopNavbar routes={routes} /> 
            {children ? children : <Outlet />} 
        </div> 
    ); 
}; 
    
    export default UserLayout;