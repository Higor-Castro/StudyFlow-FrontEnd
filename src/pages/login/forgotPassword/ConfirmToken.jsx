// Imports da Pagina
import { useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import useApi from "../../../hooks/useApi";

function ConfirmToken() {
  // Guarda o token digitado pelo usuário
  const [token, setToken] = useState("");
  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();
  // Permite acessar informações enviadas pela página anterior
  const location = useLocation();
  // Recuperar o e-mail enviado da página anterior
  const email = location.state?.email;
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Pega a função de requisição do hook useApi
  const { request, loading } = useApi();

  if (!email) {
    // Se não existir um e-mail, retorna o usuário para a tela anterior
    return <Navigate to="/forgotPassword" />;
  }

  async function handleSubmit(e) {
    // Evita que a página seja recarregada
    e.preventDefault();
    // Limpa mensagens anteriores
    setMensagem("");
    // retorna caso o código não tenha 6 dígitos
    if (token.length !== 6) {
      setMensagem("O código precisa ter exatamente 6 dígitos");
      return;
    }

    try {
      // Envia o e-mail para realizar o enviou do token
      await request("/users/senha/validar", {
        method: "POST",
        body: { email, token }
      });
      // Redireciona para a página de token
      navigate("/forgotPassword/reset", { state: { email, token } });
    } catch (err) {
      // Caso aconteça algum erro, exibe a mensagem
      setMensagem(err.message);
    }
  }
  return (
    <div className="page">
      <div className="card">
        <h1>Confirme o Código</h1>
        <p className="texto-centro">
          Digite o código de 6 digitos enviado para e-mail cadastrado.
          <strong> Pode chegar como Spam.</strong>
        </p>
        {/* Formulário de validação do token */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* Campo para digitar o token */}
            <input
              type="text"
              id="token"
              placeholder="Digite o código"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              maxLength={6}
            />
          </div>
          <div className="two-btn">
            {/* Botão para voltar para a tela de e-mail */}
            <button
              className="btn btn-voltar" type="button" onClick={() => navigate("/forgotPassword")}>
              Voltar
            </button>
            {/* Botão para ir para o reset da senha */}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Validando..." : "Confirmar"}
            </button>
          </div>
        </form>
        {/* Exibe a mensagem de erro caso exista */}
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default ConfirmToken;
