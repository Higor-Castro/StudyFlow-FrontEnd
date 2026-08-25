import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useApi from "../../hooks/useApi";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const { request } = useApi()

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais");
      return;
    }

    const user = {
      username: username,
      email: email,
      senha: senha,
      senhaComparar: confirmarSenha,
    };

    try {
      await request("/users/cadastro", {
        method: "POST",
        body: user,
      });

      navigate("/login");
    } catch (err) {
      setMensagem(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Cadastro</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="Confirme a senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">
            Cadastrar
          </button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <p className="texto-centro">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
