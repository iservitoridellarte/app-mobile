import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const UpdatePasswordScreen = ({ navigation, route }) => {
  const { userID } = route.params;
  const [error, setError] = useState("");
  const [currnetPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setCconfirmPassword] = useState("");
  const [alertType, setAlertType] = useState("error");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    password: currnetPassword,
    newPassword: newPassword,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // method to update the password by the check the current password
  const updatePasswordHandle = () => {
    if (currnetPassword == newPassword) {
      setError("You are not allowed to set the previous used password");
    } else if (newPassword != confirmPassword) {
      setError("Password non combacia");
    } else {
      setError("");
      fetch(
        network.serverip + "/reset-password?id=" + String(userID),
        requestOptions
      ) // API call
        .then((response) => response.json())
        .then((result) => {
          setAlertType("success");
          setError("Password is updated successfully ");
        })
        .catch((error) => {
          setAlertType("error");
          setError(error.message);
          console.log("error", error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Aggiorna Password</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            La tua nuova password deve essere differenze da quella attuale.
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomAlert message={error} type={alertType} />
        <CustomInput
          value={currnetPassword}
          setValue={setCurrentPassword}
          placeholder={"Password attuale"}
          secureTextEntry={true}
        />
        <CustomInput
          value={newPassword}
          setValue={setNewPassword}
          placeholder={"Nuova Password"}
          secureTextEntry={true}
        />
        <CustomInput
          value={confirmPassword}
          setValue={setCconfirmPassword}
          placeholder={"Conferma nuova Password"}
          secureTextEntry={true}
        />
      </View>
      <CustomButton
        text={"Aggiorna Password"}
        onPress={updatePasswordHandle}
        radius={5}
      />
    </View>
  );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({
  container: {
    //flexDirection: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  formContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    //flexDirection: "row",
  },
});