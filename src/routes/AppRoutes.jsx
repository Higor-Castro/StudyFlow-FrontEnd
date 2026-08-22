import {createBrowserRouter, Navigate} from "react-router-dom";

import Login from "../pages/login/login"
import Cadastro from "../pages/register/register"
import TwoFA from "../pages/login/2fa/twoFA"
import Home from "../pages/home/home"

const router = createBrowserRouter([
    {
    path: "/",
    element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Cadastro />
    },{
        path: "/login/2fa",
        element: <TwoFA />
    },{
        path: "/home",
        element: <h1>Home</h1>
    }
]);

export default router