// Importa o createBrowserRouter para criar as rotas da aplicação e Navigate para redirecionar
import {createBrowserRouter, Navigate} from "react-router-dom";
// Importa as páginas que serão utilizadas nas rotas
import Login from "../pages/login/login"
import Cadastro from "../pages/register/register"
import TwoFA from "../pages/login/2fa/twoFA"
import Home from "../pages/home/home"
import Profile from "../pages/profile/profile"

// Cria as rotas da aplicação
const router = createBrowserRouter([
    {
    // Rota inicial da aplicação
    path: "/",
    // Redireciona automaticamente para a página de login
    element: <Navigate to="/login" replace />,
    },
    {
        // Rota da página de login
        path: "/login",
        element: <Login />,
    },
    {
        // Rota da página de cadastro
        path: "/register",
        element: <Cadastro />
    },{
        // Rota da página de verificação em duas etapas
        path: "/login/2fa",
        element: <TwoFA />
    },{
        // Rota da página inicial
        path: "/home",
        element: <Home />
    },{
        // Rota da página de perfil
        path: "/profile",
        element:<Profile />
    }
]);

// Exporta as rotas para serem utilizadas na aplicação
export default router