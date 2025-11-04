import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { mhAuth } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [mhUser, setMhUser] = useState(null);
  const [mhLoading, setMhLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(mhAuth, (user) => {
      setMhUser(user);
      setMhLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ mhUser, setMhUser, mhLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
