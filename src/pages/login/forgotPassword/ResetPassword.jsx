// Imports da Pagina
import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

function ResetPassword() {
    // Permite redirecionar o usuário para outra página
    const navigate = useNavigate();
    // Guarda a nova senha digitada pelo usuário
    const [novaSenha, setNovaSenha] = useState("");
    // Guarda a confirmação da nova senha
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // Permite acessar informações enviadas pela página anterior
    const location = useLocation();
    const email = location.state?.email;
    const token = location.state?.token;

    if (!email || !token) {
        // Se não existir um e-mail ou token, retorna o usuário para a tela anterior
        return <Navigate to="/forgotPassword" />;
    }

    async function handleSubmit(e) {
        // Evita que a página seja recarregada
        e.preventDefault();
        // Aguardando o backend
        // Redireciona para a página de login após redefinir a senha
        if (novaSenha !== confirmarSenha) {
            return;
        }
        navigate("/login");
    }

    return (
        <div className="page">
            <div className="card">
                <h1>Redefinir Senha</h1>
                <p className="texto-centro">
                    Digite sua nova senha para concluir a recuperação.
                </p>
                {/* Formulário de redefinição de senha */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* Campo para digitar a nova senha */}
                        <label htmlFor="novaSenha">Nova senha:</label>
                        <input
                            type="password"
                            id="novaSenha"
                            placeholder="Digite a nova senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        {/* Campo para confirmar a nova senha */}
                        <label htmlFor="confirmarSenha">Confirmar senha:</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            placeholder="Confirme a nova senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>
                    <div className="two-btn">
                        {/* Botão para voltar para a tela do token */}
                        <button className="btn btn-voltar" type="button" onClick={() => navigate("/forgotPassword")}>
                            Voltar
                        </button>
                        {/* Botão para confirmar a nova senha */}
                        <button className="btn" type="submit">
                            Redefinir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;