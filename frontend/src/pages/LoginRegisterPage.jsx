import { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginRegisterPage = () => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      await login(email, password);
      navigate("/dashboard"); 
    } catch (err) {
      if (err.response?.status === 400) {
        setMessage("Користувача не знайдено. Спершу зареєструйтеся.");
      } else {
        setMessage("Помилка входу. Спробуйте ще раз.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      await register(email, password);
      setMessage("Реєстрація успішна! Тепер можете увійти.");
    } catch (err) {
      if (err.response?.status === 400) {
        setMessage("Користувач з таким email вже існує.");
      } else {
        setMessage("Помилка реєстрації. Спробуйте ще раз.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>TimeCapsule</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      {message && <p style={{ color: "white" }}>{message}</p>}

      <div className="button-group">
        <button onClick={handleLogin} disabled={isLoading}>
          Увійти
        </button>
        <button onClick={handleRegister} disabled={isLoading}>
          Зареєструватися
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
