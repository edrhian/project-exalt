import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Picker } from "react-native";

import Boton from "../components/Boton";
import Header from "../components/Header";
import InputText from "../components/UserTextInput";
import DropdownPicker from "../components/DropdownPicker";
import { ScrollView } from "react-native-web";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Registrarse = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [pacienteName, setPacienteName] = useState("");
  const [pacienteDni, setPacienteDni] = useState("");
  const [pacienteHospital, setPacienteHospital] = useState("");

  const registerUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        role: rol,
        fullName: username,
        dni: dni,
        phoneNumber: telefono,
        email: email,
        password: password,
        password2: password2,
        patientName: pacienteName,
        patientDni: pacienteDni,
        hospital: pacienteHospital,
      });
      await AsyncStorage.setItem(
        "patientId",
        response.data.userPatients[response.data.userPatients.length - 1].id
      );
      await AsyncStorage.setItem("token", response.data.token);

      navigation.navigate("Titulo");
    } catch (error) {
      alert("ERROR");
      console.log(error);
    }
  };

  return (
    <View style={styles.containerGeneral}>
      <Header headerTitle="Registrarse" navigation={navigation} />

      <ScrollView>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputContainer}
            onChangeText={setUsername}
            placeholder={"Nombre"}
          />

          <TextInput
            style={styles.inputContainer}
            onChangeText={setDni}
            placeholder={"DNI"}
          />

          <TextInput
            style={styles.inputContainer}
            onChangeText={setEmail}
            placeholder={"Email"}
          />

          <Picker
            selectedValue={"Rol"}
            style={styles.picker}
            onValueChange={(itemValue) => setRol(itemValue)}
          >
            <Picker.Item label=" Select your rol: " style={styles.text} />
            <Picker.Item label="Familia" value="familia" style={styles.text} />
            <Picker.Item label="Doctor/a" value="doctor" style={styles.text} />
          </Picker>

          <TextInput
            style={styles.inputContainer}
            onChangeText={setTelefono}
            placeholder={"Teléfono"}
          />

          <TextInput
            style={styles.inputContainer}
            onChangeText={setPassword}
            placeholder={"Contraseña"}
          />

          <TextInput
            style={styles.inputContainer}
            onChangeText={setPassword2}
            placeholder={"Repetir contraseña"}
          />

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: 226,
            }}
          />
          <Text>Datos del paciente</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: 226,
            }}
          />

          <TextInput
            style={styles.inputContainer}
            onChangeText={setPacienteName}
            placeholder={"Nombre"}
          />

          <TextInput
            style={styles.inputContainer}
            onChangeText={setPacienteDni}
            placeholder={"DNI"}
          />

          <TextInput
            style={styles.inputContainer}
            onChangeText={setPacienteHospital}
            placeholder={"Hospital"}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Boton texto="Registrarse" onPress={registerUser} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
    backgroundColor: "#C2FFFD",
  },
  inputContainer: {
    marginTop: 25,
    marginBottom: 25,
    width: 226,
    height: 32,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  picker: {
    width: 226,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Registrarse;
