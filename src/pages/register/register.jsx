import { Link } from "react-router-dom";
import { useState } from "react"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  function handleSubmit (e) {
    e.preventDefault();

    if (senha !== confirmarSenha){
      alert("As senhas não são iguais")
      return
    }
    const user = {
      username: username,
      email: email,
      senha: senha,
      senhaComparar: confirmarSenha,
    }

    console.log(usuario)
  }

  return (
    <div>
      <h1>Cadastro</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" placeholder="Digite o nome" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" placeholder="Digite o e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div>
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite a senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
        </div>

        <div>
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input type="password" id="confirmarSenha" placeholder="Confirme a senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)}/>
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
    </div>
  );
}

export default Register;