import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mensagem, setMensagem] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    })

    const texto = await response.text()

    if (!response.ok) {
      setMensagem(texto)
      return
    }

    navigate("/login/2fa", { state: { email } })
  }


  return (
    <div className="page">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" placeholder="Digite o e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite a senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>

          <button className="btn" type="submit">Entrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <p className="texto-centro">Cliente não cadastrado? <Link to="/register">Clique aqui</Link></p>
      </div>
    </div>
  );
}

export default Login;