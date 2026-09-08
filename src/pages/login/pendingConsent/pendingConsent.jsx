// Importa recursos de navegação do React Router
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import useApi from "../../../hooks/useApi";

function PendingConsent() {
    const VERSAO_TERMO = "1.0";

    const location = useLocation();
    const navigate = useNavigate();
    // Para receber os dados da pagina anterior
    const email = location.state?.email;
    // Guarda se o usuário marcou o checkbox de aceite
    const [aceito, setAceito] = useState(false);
    // Guarda mensagens de erro
    const [mensagem, setMensagem] = useState("");
    // Pega a função de requisição do hook useApi
    const { request, loading } = useApi();

    // Se não tiver e-mail, manda de volta pra o login
    if (!email) {
        return <Navigate to="/login" />;
    }

    async function handleSubmit(e) {
        // Evita que a página seja recarregada
        e.preventDefault();
        setMensagem("");
        
        // Caso não aceite o checkbox, não deixa continuar
        if (!aceito) {
            setMensagem("Você precisa aceitar os termos para fazer o login");
            return;
        }

        try {
            // Faz a requisição para aceitar o termo de consentimento
            await request("/users/consentimento/aceitar", {
                method: "POST",
                body: { email },
            });
            // Volta para o login para a pessoa entrar normalmente
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
                    Identificamos que o consentimento para o tratamento dos seus dados
                    pessoais foi revogado. Para continuar utilizando o sistema, é
                    necessário aceitar o termo novamente.
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
                        <label htmlFor="aceite">
                            {/* Checkbox para aceitar o termo */}
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
                        {/* Botão para voltar para a tela de login */}
                        <button className="btn btn-voltar" type="button" onClick={() => navigate("/login")}>
                            Voltar
                        </button>
                        {/*Botão para aceitar o termo*/}
                        <button className="btn" type="submit" disabled={!aceito || loading}>
                            {loading ? "Aceitando..." : "Aceitar e continuar"}
                        </button>
                    </div>
                </form>
                {/* Exibe a mensagem de erro caso exista */}
                {mensagem && <p>{mensagem}</p>}
            </div>
        </div>
    );
}

export default PendingConsent;