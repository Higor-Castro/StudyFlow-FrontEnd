// Imports da Pagina
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmToken() {
  // Guarda o token digitado pelo usuário
  const [token, setToken] = useState("");
  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  async function handleSubmit(e) {
    // Evita que a página seja recarregada
    e.preventDefault();
    // Aguardando o backend
  }
  return (
    <div className="page">
      <div className="card">
        <h1>Confirme o Código</h1>
        <p className="texto-centro">
          Digite o código enviado para o e-mail cadastrado.{" "}
          <strong>Pode chegar como Spam.</strong>
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
            />
          </div>
          <div className="two-btn">
            {/* Botão para voltar para a tela de e-mail */}
            <button
              className="btn btn-voltar" type="button" onClick={() => navigate("/forgotPassword")}>
              Voltar
            </button>
            {/* Botão para ir para o reset da senha */}
            <button className="btn" type="submit">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmToken;
