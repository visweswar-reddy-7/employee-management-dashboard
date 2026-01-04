import React, { createContext, useContext, useState } from 'react';
import { STORAGE_KEYS, DEFAULT_CREDENTIALS } from '../constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true');

  const login = (email, pass) => {
    if (email === DEFAULT_CREDENTIALS.EMAIL && pass === DEFAULT_CREDENTIALS.PASSWORD) {
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
      setUser(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    setUser(false);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
