import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);

  return (
   <div className="menu-container">
    <Link to="/create-capsule" className="menu-link">
      Create Capsule
    </Link>

    <Link to="/view-capsules" className="menu-link">
      View Capsules
    </Link>

  <button onClick={logout} className="logout-btn">
    Logout
  </button>
</div>
  );
};

export default DashboardPage;
