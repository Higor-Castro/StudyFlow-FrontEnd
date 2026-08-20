function Login() {
  return (
    <div>
      <h1>Login</h1>

      <input type="email"placeholder="Digite o e-mail"/>

      <input type="password" placeholder="Digite a senha"/>

      <button>Entrar</button>

      <p>Cliente não cadastrado? <a href="/register/register.jsx">Clique aqui</a></p>

    </div>
  );
}

export default Login;