import {createBrowserRouter, Navigate} from "react-router-dom";

import Login from "../pages/login/login"
import Cadastro from "../pages/register/register"

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
    }
]);

export default router