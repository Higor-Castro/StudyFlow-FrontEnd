// Importa recursos de navegação do React Router
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Importa utilitários de autenticação e o hook de requisições
import { removeToken } from "../../../utils/auth";
import useApi from "../../../hooks/useApi";

function ConsentProfile() {
  const VERSAO_TERMO = "1.0";

  const navigate = useNavigate();
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");
  // Pega a função de requisição do hook useApi
  const { request, loading } = useApi();

  // Função executada quando o usuário confirma a revogação
  async function handleRevogar() {
    setMensagem("");

    try {
      // Envia a requisição para revogar o consentimento
      await request("/users/consentimento/revogar", { method: "POST" });

      // Como o consentimento foi revogado, encerra a sessão do usuário
      removeToken();
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
          Este é o termo que você aceitou no momento do cadastro. Você pode
          revogar seu consentimento a qualquer momento.
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

        {/* Aviso sobre a consequência da revogação */}
        <p className="aviso-revogacao">
          Atenção: ao revogar o consentimento, você não poderá mais utilizar
          o sistema até aceitar o termo novamente.
        </p>

        {mensagem && <p>{mensagem}</p>}

        <div className="two-btn">
          {/* Volta para a tela de perfil sem fazer nada */}
          <button
            className="btn btn-voltar"
            type="button"
            onClick={() => navigate("/profile")}
          >
            Voltar
          </button>
          {/* Revoga o consentimento */}
          <button
            className="btn btn-sair"
            type="button"
            onClick={handleRevogar}
            disabled={loading}
          >
            {loading ? "Revogando..." : "Revogar consentimento"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentProfile;