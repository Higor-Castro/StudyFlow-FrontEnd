function Register() {
  return (
    <div>
      <h1>Cadastro</h1>
      
      <form>
        <div>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" placeholder="Digite o nome"/>
        </div>

        <div>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" placeholder="Digite o e-mail"/>
        </div>

        <div>
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite a senha"/>
        </div>

        <div>
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input type="password" id="confirmarSenha" placeholder="Confirme a senha"/>
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      <p>Já tem uma conta? <a href="/login/login.jsx">Faça login</a></p>
    </div>
  );
}

export default Register;