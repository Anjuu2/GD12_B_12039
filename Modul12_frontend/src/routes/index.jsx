import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import { ToastContainer } from "react-toastify"; 
 
import UserLayout from "../layouts/UserLayout"; 
 
import LoginPage from "../pages/auth/LoginPage"; 
import RegisterPage from "../pages/auth/RegisterPage"; 
import DashboardPage from "../pages/DashboardPage"; 
import ContentPage from "../pages/ContentPage"; 
import ProtectedRoutes from "./ProtectedRoutes";
import Watch_laterPage from "../pages/Watch_latePage";

const router = createBrowserRouter([ 
    { 
        path: "*", 
        element: <div>Routes Not Found!</div>, 
    }, 
    { 
        children: [ 
            { 
                path: "/", 
                element: <LoginPage />, 
            }, 
            { 
                path: "/register", 
                element: <RegisterPage />, 
            }, 
        ], 
    }, 
    { 
        path: "/user", 
        element: ( 
        <ProtectedRoutes> 
            <UserLayout /> 
        </ProtectedRoutes> 
    ), 
    children: [ 
        { 
            path: "/user", 
            element: <DashboardPage />, 
        }, 
        { 
            path: "/user/content", 
            element: <ContentPage />, 
        },
        {
            path: "/user/watch-later",
            element: <Watch_laterPage />
            
        }
    ], 
    }, 
]); 
    
const AppRouter = () => { 
    return (
        <> 
        <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark" 
        /> 
        <RouterProvider router={router} /> 
        </> 
    ); 
}; 

export default AppRouter;