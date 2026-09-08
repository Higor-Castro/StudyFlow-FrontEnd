// Importa o createBrowserRouter para criar as rotas da aplicação e Navigate para redirecionar
import {createBrowserRouter} from "react-router-dom";
// Importa as páginas que serão utilizadas nas rotas
import Login from "../pages/login/login"
import Cadastro from "../pages/register/register"
import TwoFA from "../pages/login/2fa/twoFA"
import Home from "../pages/home/home"
import Profile from "../pages/profile/profile"
import RequestReset from "../pages/login/forgotPassword/RequestReset";
import ConfirmToken from "../pages/login/forgotPassword/ConfirmToken";
import ResetPassword from "../pages/login/forgotPassword/ResetPassword";
import ConsentForm from "../pages/register/consentForm/consentForm"
import ConsentProfile from "../pages/profile/consent/consentProfile"

// Importa o componente PrivateRoute para proteger as rotas privadas
import PrivateRoute from "./PrivateRoute"

// Cria as rotas da aplicação
const router = createBrowserRouter([
    {
    // Rota inicial da aplicação
    path: "/",
    // Redireciona automaticamente para a página de login
    element: <Login />,
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
        // Rota da página de termo de consentimento
        path: "/register/termo",
        element: <ConsentForm />
    },{
        // Rota da página de verificação em duas etapas
        path: "/login/2fa",
        element: <TwoFA />
    },{
        // Rota da página inicial
        path: "/home",
        element: <PrivateRoute><Home /></PrivateRoute>
    },{
        // Rota da página de perfil
        path: "/profile",
        element:<PrivateRoute><Profile /></PrivateRoute>
    },{
        // Rota da página do termo de consentimento do perfil
        path: "/profile/termo",
        element: <PrivateRoute><ConsentProfile /></PrivateRoute>
    },{
        // Rota da página de solicitação de recuperação de senha
        path: "/forgotPassword",
        element: <RequestReset />
    },{
        // Rota da página de confirmação do token
        path: "/forgotPassword/token",
        element: <ConfirmToken />
    },{
        // Rota da página de redefinição de senha
        path: "/forgotPassword/reset",
        element: <ResetPassword />
    }


]);

// Exporta as rotas para serem utilizadas na aplicação
export default router