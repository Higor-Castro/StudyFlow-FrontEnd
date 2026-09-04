// Imports da Pagina
import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";

function ResetPassword() {
    // Permite redirecionar o usuário para outra página
    const navigate = useNavigate();
    // Guarda a nova senha digitada pelo usuário
    const [senha, setSenha] = useState("");
    // Guarda a confirmação da nova senha
    const [senhaComparar, setSenhaComparar] = useState("");
    // Guarda mensagens de erro
    const [mensagem, setMensagem] = useState("");
    // Pega a função de requisição do hook useApi
    const { request, loading } = useApi();

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
        setMensagem("");

        if (senha !== senhaComparar) {
            setMensagem("As senhas não coincidem.");
            return;
        }

        try {
            await request("/users/senha/redefinir", {
                method: "POST",
                body: { email, token, senha, senhaComparar },
            });
            // Redireciona para a página de login após redefinir a senha
            navigate("/login");
        } catch (err) {
            setMensagem(err.message);
        }
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
                        <label htmlFor="senha">Nova senha:</label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="Digite a nova senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        {/* Campo para confirmar a nova senha */}
                        <label htmlFor="senhaComparar">Confirmar senha:</label>
                        <input
                            type="password"
                            id="senhaComparar"
                            placeholder="Confirme a nova senha"
                            value={senhaComparar}
                            onChange={(e) => setSenhaComparar(e.target.value)}
                        />
                    </div>
                    <div className="two-btn">
                        {/* Botão para voltar para a tela do token */}
                        <button className="btn btn-voltar" type="button" onClick={() => navigate("/forgotPassword")}>
                            Voltar
                        </button>
                        {/* Botão para confirmar a nova senha */}
                        <button className="btn" type="submit" disabled={loading}>
                            {loading ? "Redefinindo..." : "Redefinir"}
                        </button>
                    </div>
                </form>
                {/* Exibe a mensagem de erro caso exista */}
                {mensagem && <p>{mensagem}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;