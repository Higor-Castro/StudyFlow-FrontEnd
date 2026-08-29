import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import useApi from "../../hooks/useApi";

function Profile() {
  const navigate = useNavigate();
  const { request } = useApi();

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
  return (
    <div className="page">
      <div className="card">
        <h1>Perfil</h1>

        <p>Nome:</p>
        <p>E-mail:</p>

        <button className="btn">Redefinir Senha</button>
        <br />
        <br />
        <button className="btn">Exportar informações</button>
        <br />
        <br />
        <button className="btn">Excluir conta</button>
        <br />
        <br />
        <button className="btn" type="button" onClick={() => navigate("/home")}> Voltar para home </button>
        <br /><br />
        <button className="btn btn-sair" type="button" onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default Profile;
