import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function TwoFA() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  const [codigo, setCodigo] = useState("")
  const [mensagem, setMensagem] = useState("")

  if (!email) {
    return <Navigate to="/login" />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMensagem("")

    const response = await fetch("http://localhost:8080/users/login/2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, codigo }),
    });

    const texto = await response.text()

    if (!response.ok) {
      setMensagem(texto)
      return;
    }

    navigate("/home")
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Verficação de duas Etapas</h1>

        <p className="texto-centro">Digite o código de 6 digitos enviado para o seu e-email.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Digite o código" value={codigo} onChange={(e) => setCodigo(e.target.value)} maxLength={6} />
          </div>
          <button className="btn" type="submit">Confirmar código</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default TwoFA;
