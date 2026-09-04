// Imports da pagina
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";

function RequestReset() {
  // Guarda o e-mail digitado pelo usuário
  const [email, setEmail] = useState("");
  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Pega a função de requisição do hook useApi
  const { request, loading } = useApi();

  // Função executada quando o formulário é enviado
  async function handleSubmit(e) {
    // Evita que a página seja recarregada
    e.preventDefault();
    // Limpa mensagens anteriores
    setMensagem("");

    try {
      // Envia o e-mail para realizar o enviou do token
      await request("/users/senha/recuperar", { 
        method: "POST", 
        body: { email } 
      });
      // Redireciona para a página de token
      navigate("/forgotPassword/token", { state: { email } });
    } catch (err) {
      // Caso aconteça algum erro, exibe a mensagem
      setMensagem(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Esqueci minha senha</h1>

        <p className="texto-centro">
          Digite o e-mail cadastrado para receber o código de verificação.
        </p>

        {/* Formulário de solicitação de recuperação */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* Campo para digitar o e-mail */}
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="two-btn">
            {/* Botão para voltar para a tela de login */}
            <button className="btn btn-voltar" type="button" onClick={() => navigate("/login")}>
              Voltar
            </button>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
        {/* Exibe a mensagem de erro caso exista */}
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default RequestReset;
