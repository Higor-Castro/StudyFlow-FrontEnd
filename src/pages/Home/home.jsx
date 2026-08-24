import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/profile">
        <FaUserCircle size={35} />
      </Link>
    </div>
  );
}

export default Home;