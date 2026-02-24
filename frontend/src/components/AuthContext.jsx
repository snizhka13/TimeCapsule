import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export  const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await api.post("/auth/refresh");
      setAccessToken(res.data.accessToken);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Refresh token failed:", err);
      setAccessToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  checkAuth();
}, []);


  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setAccessToken(res.data.accessToken);
    setIsAuthenticated(true);
  };

  const register = async (email, password) => {
    const res = await api.post("/auth/register", { email, password });
    setAccessToken(res.data.accessToken);
    setIsAuthenticated(true);
  };
  
  const logout = async () => {
    await api.post("/auth/logout");
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
