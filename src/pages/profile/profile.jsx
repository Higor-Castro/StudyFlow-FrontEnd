import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";

function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };

    return (
        <div className="page">
            <div className="card">
                <h1>Perfil</h1>

                <p>Nome:</p>
                <p>E-mail:</p>

                <button className="btn">Redefinir Senha</button>
                <br /><br />
                <button className="btn">Exportar informações</button>
                <br /><br />
                <button className="btn">Excluir conta</button>
                <br /><br />
                <button
                    className="btn btn-sair"
                    type="button"
                    onClick={handleLogout}
                >
                    Sair
                </button>
            </div>
        </div>
    )
}

export default Profile;