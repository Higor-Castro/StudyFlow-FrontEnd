import {createBrowserRouter, Navigate} from "react-router-dom";

import Login from "../pages/login/login"
import Cadastro from "../pages/register/register"
import TwoFA from "../pages/login/2fa/twoFA"

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
    }
]);

export default router