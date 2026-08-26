// Importa recursos de navegação do React Router
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
// Importa o hook responsável pelas requisições para a API
import useApi from "../../../hooks/useApi";

// Cria o componente da página de verificação em duas etapas
function TwoFA() {
  // Permite acessar informações enviadas pela página anterior
  const location = useLocation();
  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();
  // Recupera o e-mail enviado pela tela de login
  const email = location.state?.email;

  // Guarda o código de verificação digitado pelo usuário
  const [codigo, setCodigo] = useState("");
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Pega a função de requisição do hook useApi
  const { request } = useApi();

  // Se não existir um e-mail, retorna o usuário para a tela de login
  if (!email) {
    return <Navigate to="/login" />;
  }

  // Função executada quando o formulário é enviado
  async function handleSubmit(e) {
    // Evita o recarregamento da página
    e.preventDefault();
    // Limpa mensagens anteriores
    setMensagem("");

    try {
      // Envia o e-mail e o código para a API validar o 2FA
      await request("/users/login/2fa", {
        method: "POST",
        body: { email, codigo },
      });
      // Se a validação der certo, redireciona para a Home
      navigate("/home");
    } catch (err) {
      // Caso aconteça algum erro, exibe a mensagem
      setMensagem(err.message);
    }
  }

  //Monta apagina de 2 FA
  return (
    <div className="page">
      <div className="card">
        <h1>Verficação de duas Etapas</h1>

        <p className="texto-centro">
          Digite o código de 6 digitos enviado para e-mail cadastrado. <strong>Pode chegar como Spam.</strong>
        </p>

        {/* Formulário de validação do código */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* Campo para digitar o código de 6 dígitos */}
            <input
              type="text"
              placeholder="Digite o código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              maxLength={6}
            />
          </div>
          <div className="twofa-botoes">
            {/* Volta para a tela de login */}
            <button className="btn btn-voltar" type="button" onClick={() => navigate("/login")}>
              Voltar
            </button>
            {/* Envia o código para validação */}
            <button className="btn" type="submit">
              Confirmar código
            </button>
          </div>
        </form>
        {/* Exibe uma mensagem caso exista */}
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}
// Exporta o componente TwoFA
export default TwoFA;
