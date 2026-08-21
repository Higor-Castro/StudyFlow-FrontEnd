import { useState } from "react";

function TwoFA() {
    const [codigo, setCodigo] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        console.log(codigo)
    }
  return (
    <div>
      <h1>Verficação de duas Etapas</h1>

      <p>Digite o código de 6 digitos enviado para o seu e-email.</p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite o código" value={codigo} onChange={(e)=> setCodigo(e.target.value)} maxLength={6}/>
        <button type="submit">Confirmar código</button>
      </form>
    </div>
  );
}

export default TwoFA;