import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {useTheme, Text, Button, TextInput} from "react-native-paper";
import ScreenLayout from "../components/ui/ScreenLayout";
import DividerWithSpacer from "../components/ui/DividerWithSpacer";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../context/AuthContext";
import Constants from "expo-constants"; // to show the app version

const LoginScreen = () => {
  const {colors} = useTheme(); // Get the colors from the theme
  const navigation = useNavigation();
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigation.navigate("MainFlow");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <View
        style={{justifyContent: "flex-end", alignItems: "center", height: 150}}
      >
        <Text
          variant="headlineMedium"
          style={[{color: colors.text}, styles.formTitle]}
        >
          Enter to Outfy
        </Text>
        <Text variant="titleMedium" style={[{color: colors.text}]}>
          Log in
        </Text>
      </View>
      <View
        style={{
          // borderWidth: 1,
          // borderColor: "red",
          height: 220,
          justifyContent: "space-around",
        }}
      >
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={{height: 65, borderCurve: 10}}
          textColor={colors.text}
          right={<TextInput.Icon icon="email" forceTextInputFocus={false} />}
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setShowPassword(!showPassword)}
              forceTextInputFocus={false}
            />
          }
          onChangeText={(password) => setPassword(password)}
          style={{height: 65, borderCurve: 10}}
          textColor={colors.text}
        />
      </View>
      <Button mode="contained" onPress={handleLogin} loading={loading}>
        Login
      </Button>
      <DividerWithSpacer />
      <View style={{alignItems: "center"}}>
        <Text style={{marginTop: 10, color: colors.text}}>
          Version: {Constants.expoConfig.version}
        </Text>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  formTitle: {fontWeight: "bold"},
});

export default LoginScreen;
