import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useApi from "../../hooks/useApi";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const { request } = useApi();

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");

    try {
      // CERTO
      await request("/users/login", { method: "POST", body: { email, senha } });

      navigate("/login/2fa", { state: { email } });
    } catch (err) {
      setMensagem(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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

          <button className="btn" type="submit">
            Entrar
          </button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <p className="texto-centro">
          Cliente não cadastrado? <Link to="/register">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
