import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login</h1>

      <input type="email"placeholder="Digite o e-mail"/>

      <input type="password" placeholder="Digite a senha"/>

      <button>Entrar</button>

      <p>Cliente não cadastrado? <Link to="/register">Clique aqui</Link></p>

    </div>
  );
}

export default Login;