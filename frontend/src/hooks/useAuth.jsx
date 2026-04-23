import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verifica sessione all'avvio
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("http://localhost:3000/utente/me", {
          credentials: "include"
        });

        if (res.status === 401) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.log("Errore verifica sessione:", err);
      }
    }

    checkSession();
  }, []);

  // LOGIN
  function login(userData) {
    setUser(userData);
  }

  // LOGOUT
  async function logout() {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include"
    });

    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
