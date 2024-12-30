import { useState, useEffect } from "react";
import routes from "../constant/routes";
import { useNavigate } from "react-router-dom";

const AUTH_STORAGE_KEY = "authData";


export const useAuth = () => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });


  // Load auth state from localStorage on initial render
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (authState.token) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [authState]);

  // Login function
  const login = (token, user) => {
    setAuthState({ token, user });
  };

  // Logout function
  const logout = () => {
    setAuthState({ token: null, user: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.href = "/login"
  };

  // Check if user is authenticated
  const isAuthenticated = !!authState.token;

  return {
    authState,
    isAuthenticated,
    login,
    logout,
  };
};
