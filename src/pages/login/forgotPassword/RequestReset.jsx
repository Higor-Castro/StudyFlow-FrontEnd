// Imports da pagina
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RequestReset() {
  // Guarda o e-mail digitado pelo usuário
  const [email, setEmail] = useState("");
  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  // Função executada quando o formulário é enviado
  async function handleSubmit(e) {
    // Evita que a página seja recarregada
    e.preventDefault();
    // Aguardando o backend
    navigate("/forgotPassword/token");
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
            <button className="btn" type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestReset;
