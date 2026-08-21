import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [mensagem, setMensagem] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais")
      return
    }

    const user = {
      username: username,
      email: email,
      senha: senha,
      senhaComparar: confirmarSenha,
    }

    const response = await fetch("http://localhost:8080/users/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })

    const texto = await response.text()

    if (!response.ok) {
      setMensagem(texto)
      return
    }

    navigate("/login")

  }

  return (
    <div>
      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" placeholder="Digite o nome" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" placeholder="Digite o e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" placeholder="Digite a senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <div>
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input type="password" id="confirmarSenha" placeholder="Confirme a senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
    </div>
  );
}

export default Register