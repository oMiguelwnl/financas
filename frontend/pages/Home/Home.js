import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export default function Home() {
  const { signOut } = useContext(AuthContext);
  return (
    <View>
      <Text>Home</Text>
      <Button title="Sair da conta" onPress={() => signOut()} />
    </View>
  );
}
