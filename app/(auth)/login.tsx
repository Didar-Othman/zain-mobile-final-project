import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function login() {
  const [email, setEmail] = useState("info@didar.dev");
  const [password, setPassword] = useState("Dd@Zain@2025");
  const [Loading, setLoading] = useState(false);

  const LoginHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data?.success) {
        alert("Login successful");
        alert(data?.token);
      } else {
        Alert.alert("Login failed", data?.message || "Unknown error");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        secureTextEntry={true}
      />
      <Pressable onPress={LoginHandler}>
        <View
          style={{ backgroundColor: "blue", padding: 10, alignItems: "center" }}
        >
          <Text style={{ color: "white" }}>
            {Loading ? "Logging in..." : "Login"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
