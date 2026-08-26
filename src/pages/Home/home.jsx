import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Home() {
  return (
    <div>
      <header className="header">
        <h1>Home</h1>
      <Link to="/profile">
        <FaUserCircle size={35} />
      </Link>
      </header>
      <main className="home-content">
        <h2>Studyflow</h2>
        <p>Organize seus estudos de forma eficiente e eficaz.</p>
      </main>
    </div>
  );
}

export default Home;