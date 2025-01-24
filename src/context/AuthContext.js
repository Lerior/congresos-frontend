import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [currentUser, setUser] = useState(localStorage.getItem('currentUser') || null);

  // Cargar el token desde localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
    const user = localStorage.getItem("currentUser");
    setUser(user);
  }, []);

  // Manejar el login
  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    localStorage.setItem("currentUser", user);
    setUser(user);

  };

  // Manejar el logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
