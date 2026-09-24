"use client";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user"); // eslint -disable-next-line react-hooks/set-state-in-effect
      if (stored) setUser(JSON.parse(stored)); // eslint -disable-next-line react-hooks/set-state-in-effect
    } catch (error) {
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

