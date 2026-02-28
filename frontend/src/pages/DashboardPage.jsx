import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);

  return (
   <div className="menu-container">
    <Link to="/create-capsule" className="menu-link">
      Створити капсулу
    </Link>

    <Link to="/view-capsules" className="menu-link">
      Переглянути капсули
    </Link>

  <button onClick={logout} className="logout-btn">
    Вийти
  </button>
</div>
  );
};

export default DashboardPage;
