import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


const ViewCapsulesPage = () => {
  const { accessToken } = useContext(AuthContext);
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openedMessage, setOpenedMessage] = useState(null);
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(capsules[0]?._id);


  // 🔹 Завантаження капсул
  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const res = await api.get("/capsules", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        // додаємо залишковий час у state
        const capsulesWithTime = res.data.map((c) => ({
          ...c,
          remaining: new Date(c.openDate) - new Date(),
        }));
        setCapsules(capsulesWithTime);
      } catch (err) {
        console.error(err);
        setError("Не вдалося завантажити капсули.");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [accessToken]);

  // 🔹 Live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCapsules((prev) =>
        prev.map((c) => {
          const diff = new Date(c.openDate) - new Date();
          return { ...c, remaining: diff };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Завантаження капсул...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (capsules.length === 0) return <p>Капсул ще немає. Створіть першу!</p>;

  const canOpen = (remaining) => remaining <= 0;

  const formatRemaining = (remaining) => {
    if (remaining <= 0) return "Можна відкрити!";
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);
    return `${hours}г ${minutes}хв ${seconds}с`;
  };

  const handleOpen = async (id) => {
    try {
      const res = await api.get(`/capsules/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setOpenedMessage(res.data);
    } catch (err) {
      console.error(err);
      alert("Не вдалося відкрити капсулу. Спробуйте пізніше.");
    }
  };

  const closeModal = () => setOpenedMessage(null);

  return (
    <div className="capsules-page">

      <div className="capsules-slider">
        {capsules.map((c) => (
          <div
            key={c._id}
            className={`capsule-card ${
              activeId === c._id ? "active" : "inactive"
            }`}
            onMouseEnter={() => setActiveId(c._id)}
          >
            <h3>{c.title}</h3>
            <p>Залишилось: {formatRemaining(c.remaining)}</p>

            <button
              disabled={!canOpen(c.remaining)}
              onClick={() => navigate(`/capsule/${c._id}/animation`)}
            >
              {canOpen(c.remaining) ? "Відкрити" : "Ще зарано"}
            </button>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>←</button>
  </div>
  );
};

export default ViewCapsulesPage;
