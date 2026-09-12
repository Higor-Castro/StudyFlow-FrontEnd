// Importa recursos de navegação do React Router e useLocation para poder passar a informação
import { Navigate , useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

// Importa o hook responsável pelas requisições para a API
import useApi from "../../../hooks/useApi";

function ConsentForm() {
  const VERSAO_TERMO = "1.0";

  const location = useLocation();
  const navigate = useNavigate();
  // Para receber os dados da pagina anterior
  const dadosCadastro = location.state;
  // Guarda se o usuário marcou o checkbox de aceite
  const [aceito, setAceito] = useState(false);
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Pega a função de requisição do hook useApi
  const { request, loading } = useApi();

  // Se não tiver os dados do cadastro, manda de volta pra tela de cadastro
  if (!dadosCadastro) {
    return <Navigate to="/register" />;
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");
    // Caso não aceite o checkbox, não deixa continuar
    if (!aceito) {
      setMensagem("Você precisa aceitar os termos de consentimento");
      return;
    }
    // Cria o objeto com os dados do usuário para cadastrar
    const user = {
      username: dadosCadastro.username,
      email: dadosCadastro.email,
      senha: dadosCadastro.senha,
      senhaComparar: dadosCadastro.confirmarSenha,
      aceiteTermos: true,
    };

    try {
      // Faz a requisição para cadastrar o usuário
      await request("/users/cadastro", {
        method: "POST",
        body: user,
      });
      // Redireciona para a tela de login após o cadastro
      navigate("/login");
    } catch (err) {
      setMensagem(err.message);
    }
  }
  return (
    <div className="page">
      <div className="card card-termo">
        <h1>Termo de Consentimento</h1>
        <p className="termo-versao">Versão {VERSAO_TERMO}</p>

        <p>
          Para utilizar o sistema, precisamos coletar e tratar alguns dados
          pessoais. Leia as informações abaixo para entender quais dados serão
          utilizados e para quais finalidades.
        </p>

        <div className="termo-conteudo">
          <h2>Dados coletados</h2>
          <ul>
            <li>Nome</li>
            <li>E-mail</li>
          </ul>

          <h2>Finalidade dos dados</h2>
          <ul>
            <li>Nome: identificação do usuário no sistema.</li>
            <li>E-mail: autenticação, comunicação com o usuário e identificação nos registros de logs.</li>
            <li>Os dados também são utilizados para a execução dos serviços oferecidos pelo sistema.</li>
          </ul>

          <h2>Compartilhamento</h2>
          <p>
            Os dados não são compartilhados com terceiros, exceto quando
            exigido por lei.
          </p>

          <h2>Consentimento</h2>
          <p>
            O usuário deve aceitar este termo para concluir o cadastro e
            utilizar o sistema. O consentimento é registrado com a data e a
            versão do termo aceita.
          </p>

          <h2>Seus direitos</h2>
          <ul>
            <li>Acessar seus dados.</li>
            <li>Corrigir seus dados.</li>
            <li>Exportar seus dados.</li>
            <li>Solicitar a eliminação dos dados quando aplicável.</li>
            <li>Revogar o consentimento.</li>
          </ul>
          <p>
            As funcionalidades de consulta, exportação, exclusão e revogação
            estão disponíveis na tela Profile. Ao revogar o consentimento, o
            usuário perde o acesso ao sistema até que um novo consentimento
            seja realizado.
          </p>
        </div>
        {/* Formulário para aceitar o termo */}
        <form onSubmit={handleSubmit}>
          <div className="form-group form-group-checkbox">
            {/* Checkboc para confirmar o aceite do termo */}
            <label htmlFor="aceite">
              <input
                type="checkbox"
                id="aceite"
                checked={aceito}
                onChange={(e) => setAceito(e.target.checked)}
              />
              Li e estou de acordo com o tratamento dos meus dados pessoais
              conforme este termo.
            </label>
          </div>
          <div className="two-btn">
            {/* Botão para voltar para a tela de cadastro */}
            <button className="btn btn-voltar" type="button" onClick={() => navigate("/register", { state: dadosCadastro })}>
              Voltar
            </button>
            {/*Botão para cadastrar usuario*/}
            <button className="btn" type="submit" disabled={!aceito || loading}>
              {loading ? "Cadastrando..." : "Aceitar e continuar"}
            </button>
          </div>
        </form>
        {/* Exibe a mensagem de erro caso exista */}
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default ConsentForm;
