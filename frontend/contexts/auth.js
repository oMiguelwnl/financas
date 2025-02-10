import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigation = useNavigation();

  async function signUp(email, password, name) {
    try {
      const response = await api.post("/users", {
        name,
        password,
        email,
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
