import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState({
    accessToken: null,
    refreshToken: null,
  });
  const [loading, setLoading] = useState(true);

  // 1. Load tokens from appropriate storage on mount
  useEffect(() => {
    const loadTokens = () => {
      // Check localStorage first (remember me)
      let savedTokens = localStorage.getItem("tokens");

      if (!savedTokens) {
        // Fallback to sessionStorage (current session only)
        savedTokens = sessionStorage.getItem("tokens");
      }

      if (savedTokens) {
        try {
          const parsedTokens = JSON.parse(savedTokens);
          setTokens(parsedTokens); // Triggers 2nd useEffect
        } catch (e) {
          clearTokens(); // Corrupted data
        }
      }
      setLoading(false);
    };

    loadTokens();
  }, []);

  // ✅ 2. Initialize session when tokens exist
  useEffect(() => {
    const initializeSession = async () => {
      if (!tokens.accessToken) return; // Skip if no token

      setLoading(true);
      try {
        // Try refresh first (cookies handle this)
        await api.get("/refresh-token").catch(() => {});
        const res = await api.get("/auth/currentUser");
        setUser(res.data.data);
        console.log("✅ Session restored:", res.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log("❌ Invalid tokens, clearing...");
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, [tokens.accessToken]); // ✅ Re-run when tokens loaded

  const clearTokens = () => {
    localStorage.removeItem("tokens");
    sessionStorage.removeItem("tokens");
    setTokens({ accessToken: null, refreshToken: null });
    setUser(null);
  };

  const login = (tokensData, rememberMe = false) => {
    // ✅ New param
    const tokenString = JSON.stringify(tokensData);

    if (rememberMe) {
      // Persist across browser closes
      localStorage.setItem("tokens", tokenString);
      sessionStorage.removeItem("tokens"); // Clear temp
    } else {
      // Clear on browser close
      sessionStorage.setItem("tokens", tokenString);
      localStorage.removeItem("tokens"); // Clear persistent
    }

    setTokens(tokensData);
  };

  const logout = () => {
    clearTokens();
  };

  const value = {
    user,
    tokens,
    login,
    logout,
    isAuthenticated: !!user && !!tokens.accessToken,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
