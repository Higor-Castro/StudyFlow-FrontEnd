import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const { request, loading } = useApi();
  // Guarda informações do usuário logado
  const [usuario, setUsuario] = useState(null);
  // Guarda mensagens de erro
  const [mensagem, setMensagem] = useState("");

  // Carregas as informações assim que o usuario entra na página de perfil
  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await request("/users/consultar");
        // Salva os dados do usuário no estado
        setUsuario(dados);
      } catch (err) {
        setMensagem(err.message);
      }
    };
    // Chama a função para carregar os dados do usuário
    carregarUsuario();
  }, [request]);

  //Função de logout do usuário
  const handleLogout = async () => {
    try {
      await request("/users/logout", { method: "POST" });
    } catch (err) {
      console.error("Erro ao chamar logout no backend:", err);
    } finally {
      removeToken();
      navigate("/login");
    }
  };

  //Funcão para exortar os dados do usuário em um arquivo JSON
  async function handleExportar() {
    setMensagem("");
    try {
      const dados = await request("/users/exportar");

      // Transforma o JSON recebido em um arquivo para download
      const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
      
      // Cria uma URL temporária para o arquivo
      const url = URL.createObjectURL(blob);

      // Cria um link e simula o clique para disparar o download
      const link = document.createElement("a");
      // Coloca a URL temporaria 
      link.href = url;
      // Define que no lugar de abrir o arquivo ele faça o download
      link.download = "meus-dados.json";
      // Simula o clique no link
      link.click();

      // Libera a memória usada pelo arquivo temporário
      URL.revokeObjectURL(url);
    } catch (err) {
      setMensagem(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Perfil</h1>

        <p>Nome: {usuario ? usuario.nome : "Carregando..."}</p>
        <p>E-mail: {usuario ? usuario.email : "Carregando..."}</p>

        {mensagem && <p>{mensagem}</p>}

        <button className="btn">Redefinir Senha</button>
        <br />
        <br />
        <button className="btn" type="button" onClick={handleExportar} disabled={loading}>{loading ? "Exportando..." : "Exportar informações"}</button>
        <br />
        <br />
        <button className="btn">Excluir conta</button>
        <br />
        <br />
        <button className="btn" type="button" onClick={() => navigate("/profile/termo")}>Ver Termo de Consentimento</button>
        <br />
        <br />
        <button className="btn" type="button" onClick={() => navigate("/home")}> Voltar para home </button>
        <br /><br />
        <button className="btn btn-sair" type="button" onClick={handleLogout} disabled={loading}>{loading ? "Saindo..." : "Sair"}</button>
      </div>
    </div>
  );
}

export default Profile;
