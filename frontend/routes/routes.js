import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignUp from "../pages/SignUp/SignUp";
import AuthRoutes from "./auth.routes";

function Routes() {
  const loading = false;
  const signed = false;

  return signed ? (
    <View>
      <Text>index</Text>
    </View>
  ) : (
    <AuthRoutes />
  );
}

export default Routes;
