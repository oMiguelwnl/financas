import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStore, setLoadingStore] = useState(true); // Começa como true

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStore() {
      try {
        const storageToken = await AsyncStorage.getItem("@finToken");

        if (storageToken) {
          const response = await api.get("/me", {
            headers: { Authorization: `Bearer ${storageToken}` },
          });

          api.defaults.headers["Authorization"] = `Bearer ${storageToken}`;
          setUser(response.data);
        }
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
        setUser(null);
      } finally {
        setLoadingStore(false); // Garante que o estado seja atualizado sempre
      }
    }

    loadStore();
  }, []);

  async function signUp(email, password, name) {
    setLoading(true);

    try {
      await api.post("/users", { name, password, email });
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      setLoading(false);
    }
  }

  async function signIn(email, password) {
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });

      const { id, name, token } = response.data;

      await AsyncStorage.setItem("@finToken", token);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser({ id, name, email });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Erro no login:", error.response?.data?.error || error);
      alert(error.response?.data?.error || "Ocorreu um erro. Tente novamente.");
    }
  }

  async function signOut() {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("@finToken");
      api.defaults.headers["Authorization"] = null;
      setUser(null);
    } catch (error) {
      console.log("Erro ao sair:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        signOut,
        loading,
        loadingStore,
      }}
    >
      {!loadingStore && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
