function Profile() {
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
            </div>
        </div>
    )
}

export default Profile;