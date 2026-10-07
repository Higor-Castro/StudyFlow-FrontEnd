// Importa o useState para criar estados e o useCallback para manter a função de requisição memorizada
import { useState, useCallback } from "react";
// Importa o Axios, responsável por fazer requisições para a API
import axios from "axios";

import { getToken, removeToken } from "../utils/auth";


// Pega a URL base da API definida no arquivo .env
const BASE_URL = import.meta.env.VITE_API_URL

// Evita mostrar o alerta de sessão expirada mais de uma vez
let sessaoExpiradaTratada = false;

// Rotas públicas: não enviam token (um token vencido causaria erro 401)
const ROTAS_PUBLICAS = [
  "/users/login",
  "/users/cadastro",
  "/users/login/2fa",
  "/users/senha/recuperar",
  "/users/senha/validar",
  "/users/senha/redefinir",
  "/users/consentimento/aceitar",
];

//Criação da função useApi, que será usada para fazer requisições para a API
function useApi() {
  // Controla se uma requisição está sendo realizada
  const [loading, setLoading] = useState(false)
  // Guarda uma mensagem caso aconteça algum erro
  const [error, setError] = useState("")

  // Função responsável por realizr as requisições para a API
  const request = useCallback(async (endpoint, options = {}) => {
    // Informa que a requisição começou
    setLoading(true)
    // Limpa possíves erros anteriores
    setError("")

    try {
      // Configura a requisição:
      // Junta a URL base com o endpoint recebido
      // Define o método HTTP caso nenhum seja informado utiliza GET
      const token = ROTAS_PUBLICAS.includes(endpoint) ? null : getToken();
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method: options.method || "GET",
        data: options.body,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      // Retorna somente os dados recebidos da API
      return response.data;
    } catch (err) {
      // Se da erro, volta para tela de login, invalidação de sessão
      if (err.response?.status === 401 && !sessaoExpiradaTratada) {
        sessaoExpiradaTratada = true;
        removeToken();
        alert("Sua sessão expirou. Faça login novamente.");
        window.location.href = "/login";
      }
      // Tenta pegar a mensagem de erro enviada pelo backend caso não exista, utiliza uma mensagem padrão
      let mensagemErro = err.response?.data?.message || "Erro na requisição";

      if (typeof mensagemErro === "object" && mensagemErro !== null) {
        mensagemErro = Object.values(mensagemErro).join(", ");
      }

      // Salva a mensagem de erro no estado
      setError(mensagemErro);
      // Lança o erro novamente para que quem chamou a função
      throw new Error(mensagemErro, { cause: err });
    } finally {
      // É executado independente da requisição dar certo ou errado
      setLoading(false)
    }
  }, [])
  // Disponibiliza a função request, o estado de carregamento e possíveis erros
  return { request, loading, error };
}
// Exporta o hook para ser utilizado em outros arquivos
export default useApi;