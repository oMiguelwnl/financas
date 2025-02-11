import React, { createContext, useState } from "react";

import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function signUp(email, password, name) {
    setLoading(true);

    try {
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

  async function signIn(email, password) {
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        token,
        email,
      };

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.response) {
        console.log("Erro no login:", error.response.data.error);
        alert(error.response.data.error); // Exibe o erro no app
      } else {
        console.log("Erro inesperado:", error);
        alert("Ocorreu um erro. Tente novamente.");
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signUp, signIn, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
