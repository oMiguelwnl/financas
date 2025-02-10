import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: "Voltar",
          headerTintColor: "#fff",
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: "#3b3dbf",
            borderBottomWidth: 1,
            borderBottomColor: "#00b94a",
          },
        }}
      />
    </AuthStack.Navigator>
  );
}
export default AuthRoutes;
