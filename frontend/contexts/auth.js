import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function signUp(email, password, name) {
    try {
      setLoading(true);
      const response = await api.post("/users", {
        name,
        password,
        email,
      });

      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, signUp, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
