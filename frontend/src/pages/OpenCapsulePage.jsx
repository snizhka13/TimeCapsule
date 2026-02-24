import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const OpenCapsulePage = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const res = await api.get(`/capsules/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setCapsule(res.data);
      } catch (err) {
        console.error(err);
        setError("Не вдалося відкрити капсулу.");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id, accessToken]);

  if (loading) return <p>Відкриваємо капсулу...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="page-container">
      <p>Відкрита: {new Date(capsule.openDate).toLocaleString()}</p>
      <div className="read-letter">
        <div className="letter-content">
           <h3>{capsule.message}</h3>
        </div>
      </div>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>←</button>
    </div>
  );
};

export default OpenCapsulePage;
