// Imports
import { Navigate, useLocation } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";
import useApi from "../hooks/useApi";
import { useEffect } from "react";

// Criação da função
function PrivateRoute({ children }) {
  // Permite acessar informações sobre a rota atual
  const location = useLocation();
  // Pega a função de requisição do hook useApi
  const { request } = useApi();
  // Recupera o token JWT salvo no navegador
  const token = getToken();

  // Executa sempre que o usuário navega para uma nova rota
  useEffect(() => {
    // Se existir um token, valida ele no backend
    if (token) {
      // Caso o token seja inválido, o próprio useApi cuida do redirecionamento
      request("/users/validar").catch(() => {});
    }
  }, [location.pathname]);

   // Se não existir um token, remove qualquer resquício e redireciona para o login
  if (!token) {
    removeToken();
    return <Navigate to="/login" replace />;
  }
  // Se existir token, libera o acesso ao conteúdo da rota protegida
  return children;
}

export default PrivateRoute;
