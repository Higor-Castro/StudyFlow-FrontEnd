// Importa o Link para permitir navegação entre páginas sem recarregar o site
import { Link } from "react-router-dom";
// Importa o ícone de usuário para colocar como link para a página de perfil
import { FaUserCircle } from "react-icons/fa";

// Cria o componente da página Home
function Home() {
  return (
    <div>
      {/* Cabeçalho da página */}
      <header className="header">
        <h1>Home</h1>
        {/* Link que redireciona para a página de perfil */}
        <Link to="/profile">
          <FaUserCircle size={35} />
        </Link>
      </header>
      {/* Conteúdo principal da página */}
      <main className="home-content">
        <h2>Studyflow</h2>
        <p>Organize seus estudos de forma eficiente e eficaz.</p>
      </main>
    </div>
  );
}

// Exporta o componente Home
export default Home;