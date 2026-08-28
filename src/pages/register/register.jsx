// Importa recursos de navegação do React Router
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Importa o hook responsável pelas requisições para a API
import useApi from "../../hooks/useApi";

// Cria o componente da página de Cadastro
function Register() {
  // Guarda o nome digitado pelo usuário
  const [username, setUsername] = useState("");
  // Guarda o e-mail digitado pelo usuário
  const [email, setEmail] = useState("");
  // Guarda a senha digitada pelo usuário
  const [senha, setSenha] = useState("");
  // Guarda a confirmação da senha
  const [confirmarSenha, setConfirmarSenha] = useState("");
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();
  // Pega a função de requisição do hook useApi
  const { request, loading } = useApi()

  // Função executada quando o formulário é enviado
  async function handleSubmit(e) {
    // Evita que a página seja recarregada
    e.preventDefault();
    // Limpa mensagens anteriores
    setMensagem("");

    // Verifica se as duas senhas digitadas são iguais
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais");
      return;
    }

    // Cria o objeto com os dados que serão enviados para a API
    const user = {
      username: username,
      email: email,
      senha: senha,
      senhaComparar: confirmarSenha,
    };

    try {
      // Envia os dados do usuário para a API realizar o cadastro
      await request("/users/cadastro", {
        method: "POST",
        body: user,
      });

      // Se o cadastro der certo, redireciona para a página de login
      navigate("/login");
    } catch (err) {
      // Caso aconteça algum erro, exibe a mensagem
      setMensagem(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Cadastro</h1>
        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* Campo para digitar o nome */}
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite o nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <div className="form-group">
            {/* Campo para confirmar a senha */}
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="Confirme a senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>
          {/* Envia o formulário de cadastro */}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {/* Exibe uma mensagem caso exista */}
        {mensagem && <p>{mensagem}</p>}

        {/* Link para voltar para a página de login */}
        <p className="texto-centro">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

// Exporta o componente Register
export default Register;
