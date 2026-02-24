import { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateCapsulePage = () => {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !message || !openDate) {
      setFeedback("Заповніть всі поля");
      return;
    }

    setIsLoading(true);
    setFeedback("");

    try {
      await api.post(
        "/capsules",
        { title, message, openDate },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setFeedback("Капсула створена успішно!");
      setTitle("");
      setMessage("");
      setOpenDate("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      setFeedback("Помилка створення капсули. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
        <div className="capsule-container">
        <h2>Створити капсулу часу</h2>

        <input
          type="text"
          placeholder="Назва капсули"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="capsule-input"
        />
        <textarea
          placeholder="Напишіть своє послання"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="letter-textarea"
        />

        <input
          type="datetime-local"
          value={openDate}
          onChange={(e) => setOpenDate(e.target.value)}
          className="capsule-input"
        />

        {feedback && <p className="success-message">{feedback}</p>}

        <button onClick={handleSubmit} disabled={isLoading} className="capsule-btn">
          {isLoading ? "Створюємо..." : "Створити капсулу"}
        </button>
      </div>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>←</button>
    </div>
    
  );
};

export default CreateCapsulePage;
