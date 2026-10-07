// Imports
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../utils/auth";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";

// Criação da função
function PrivateRoute({ children }) {
  // Permite acessar informações sobre a rota atual
  const location = useLocation();
  // Pega a função de requisição do hook useApi
  const { request } = useApi();
  // Recupera o token JWT salvo no navegador
  const token = getToken();
  const [validado, setValidado] = useState(false);

  // Executa sempre que o usuário navega para uma nova rota
  useEffect(() => {
    // Se existir um token, valida ele no backend
    if (token) {
    request("/users/validar")
      .then(() => setValidado(true))
      .catch((err) => {
        if (err.cause?.response?.status !== 401) {
          setValidado(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Se não existir um token, redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // Se o token existir, mas não for validado, mostra uma mensagem de carregamento
  if (!validado) {
    return <p>Carregando...</p>;
  }
  // Se existir token, libera o acesso ao conteúdo da rota protegida
  return children;
}

export default PrivateRoute;
