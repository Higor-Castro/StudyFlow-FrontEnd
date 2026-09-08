// Importa recursos de navegação do React Router e useLocation para poder passar a informação
import { Navigate , useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

// Importa o hook responsável pelas requisições para a API
import useApi from "../../../hooks/useApi";

function TermoConsentimento() {
  const VERSAO_TERMO = "1.0";

  const location = useLocation();
  const navigate = useNavigate();
  // Para receber os dados da pagina anterior
  const dadosCadastro = location.state;
  
  const [aceito, setAceito] = useState(false);
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Pega a função de requisição do hook useApi
  const { request, loading } = useApi();

  if (!dadosCadastro) {
    return <Navigate to="/register" />;
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");

    if (!aceito) {
      setMensagem("Você precisa aceitar os termos de consentimento");
      return;
    }

    const user = {
      username: dadosCadastro.username,
      email: dadosCadastro.email,
      senha: dadosCadastro.senha,
      senhaComparar: dadosCadastro.senhaComparar,
      aceiteTermos: true,
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

          <h2>Finalidade</h2>
          <ul>
            <li>Identificação do usuário</li>
            <li>Comunicação</li>
            <li>Execução dos serviços oferecidos pelo sistema</li>
          </ul>

          <h2>Compartilhamento</h2>
          <p>
            Dados não serão compartilhados com terceiros, exceto quando exigido
            por lei.
          </p>

          <h2>Seus direitos</h2>
          <ul>
            <li>Acessar seus dados</li>
            <li>Corrigir seus dados</li>
            <li>Solicitar a eliminação quando aplicável</li>
            <li>Revogar o consentimento</li>
          </ul>
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

export default TermoConsentimento;
