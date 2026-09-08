// Importa recursos de navegação do React Router e useLocation para poder passar a informação
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

// Cria o componente da página de Cadastro
function Register() {
  const location = useLocation();
  // Caso a pessoa clique em voltar na tela do termo
  const dadosAnteriores = location.state

  // Guarda o nome digitado pelo usuário
  const [username, setUsername] = useState(dadosAnteriores?.username || "");
  // Guarda o e-mail digitado pelo usuário
  const [email, setEmail] = useState(dadosAnteriores?.email || "");
  // Guarda a senha digitada pelo usuário
  const [senha, setSenha] = useState(dadosAnteriores?.senha || "");
  // Guarda a confirmação da senha
  const [confirmarSenha, setConfirmarSenha] = useState(dadosAnteriores?.confirmarSenha || "");
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  // Função executada quando o formulário é enviado
  function handleSubmit(e) {
    // Evita que a página seja recarregada
    e.preventDefault();
    // Limpa mensagens anteriores
    setMensagem("");
    // Verifica se todos os campos foram preenchidos
    if (!username || !email || !senha || !confirmarSenha) {
      setMensagem("Preencha todos os campos");
      return;
    }

    // Verifica se a senha possui no mínimo 6 caracteres
    if (senha.length < 6) {
      setMensagem("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    // Verifica se as duas senhas digitadas são iguais
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais");
      return;
    }

    // Redireciona para a tela do termo de consentimento, passando os dados do cadastro
    navigate("/register/termo", {
      state: {
        username: username,
        email: email,
        senha: senha,
        confirmarSenha: confirmarSenha,
      }
    });
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
          <button className="btn" type="submit">
            Continuar
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
