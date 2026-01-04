// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
// Using relative path to be safe from alias issues
import { 
  getUserRole, 
  registerUser, 
  loginUser, 
  logoutUser 
} from "../services/auth.service"; 

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          const userRole = await getUserRole(currentUser.uid);
          setRole(userRole);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error("Auth Hook Error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const register = (email, password, role) => registerUser(email, password, role);
  const login = (email, password) => loginUser(email, password);
  const logout = () => logoutUser();

  return { user, role, loading, register, login, logout };
}