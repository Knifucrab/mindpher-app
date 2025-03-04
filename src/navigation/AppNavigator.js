import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginFlowNavigator from "./LoginFlowNavigator";
import MainFlowNavigator from "./MainFlowNavigator";
import {useAuth} from "../context/AuthContext";
import {ActivityIndicator, View, useTheme} from "react-native";
import {navigationRef} from "./navigationRef";

const Stack = createNativeStackNavigator();

const AppNavigator = ({customTheme}) => {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: customTheme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={customTheme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="MainFlow">
            {() => <MainFlowNavigator customTheme={customTheme} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="LoginFlow" component={LoginFlowNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
