// Importa recursos de navegação do React Router
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// Importa o hook responsável pelas requisições para a API
import useApi from "../../hooks/useApi";

// Cria o componente da página de Login
function Login() {

  // Guarda o e-mail digitado pelo usuário
  const [email, setEmail] = useState("");
  // Guarda a senha digitada pelo usuário
  const [senha, setSenha] = useState("");
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();
  // Pega a função de requisição do hook useApi
  const { request, loading } = useApi();

  // Função executada quando o formulário é enviado
  async function handleSubmit(e) {
    // Evita que a página seja recarregada
    e.preventDefault();
    // Limpa mensagens anteriores
    setMensagem("");

    try {
      // Envia o e-mail e a senha para a API realizar o login
      await request("/users/login", { method: "POST", body: { email, senha } });
      // Se o login estiver correto, redireciona para a página de 2FA e também envia o e-mail para a próxima página
      navigate("/login/2fa", { state: { email } });
    } catch (err) {
      // Caso aconteça algum erro, exibe a mensagem
      setMensagem(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Login</h1>
        {/* Formulário de login */}
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
              autoComplete="current-password"
            />
          </div>

          <div className="form-group">
            {/* Campo para digitar a senha */}
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite a senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {/* Envia o formulário */}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        {/* Exibe uma mensagem caso exista */}
        {mensagem && <p>{mensagem}</p>}

        {/* Link para a página de cadastro */}
        <p className="texto-centro">
          Cliente não cadastrado? <Link to="/register">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
}

// Exporta o componente Login
export default Login;
