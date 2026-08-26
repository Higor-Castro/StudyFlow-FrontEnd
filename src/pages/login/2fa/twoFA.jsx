import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import useApi from "../../../hooks/useApi";

function TwoFA() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const { request } = useApi();

  if (!email) {
    return <Navigate to="/login" />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");

    try {
      await request("/users/login/2fa", {
        method: "POST",
        body: { email, codigo },
      });

      navigate("/home");
    } catch (err) {
      setMensagem(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Verficação de duas Etapas</h1>

        <p className="texto-centro">
          Digite o código de 6 digitos enviado para e-mail cadastrado. <strong>Pode chegar como Spam.</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Digite o código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              maxLength={6}
            />
          </div>
          <div className="twofa-botoes">
            <button className="btn btn-voltar" type="button" onClick={() => navigate("/login")}>
              Voltar
            </button>

            <button className="btn" type="submit">
              Confirmar código
            </button>
          </div>
        </form>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default TwoFA;
