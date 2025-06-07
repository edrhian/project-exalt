import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import Guia_creada from "../components/guia";
import Boton from "../components/Boton";
import Header from "../components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-web";

const IniciarSesionPantalla = ({ navigation }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [searchedUserPatientId, setSearchedUserPatientId] = useState(0);
  const [userPatientId, setUserPatientId] = useState(-1);

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: usuario,
        password: password,
      });

      /*
      const usuariosPacientes = response.data.userPatients;
      let foundId = -1;

      Busca si el usuarioAdministrador tiene un usuarioPaciente que coincida con el id proporcionado
      for (let i = 0; i < usuariosPacientes.length; i++) {
        if (usuariosPacientes[i].id === searchedUserPatientId) {
          foundId = usuariosPacientes[i].id;
          break;
        }
      }

      if (foundId === -1) {
        alert("El usuario paciente no fue encontrado");
        return;
      }
      *

      setUserPatientId(foundId);
      */
      // Guarda datos dentro del AsyncStorage
      // POR AHORA, EL PACIENTE ID NO SE BUSCA SI EXISTE DENTRO DEL USAR ADMIN, DIRECTAMENTE SE ESCOJE DESDE EL TEXTINPUT
      await AsyncStorage.setItem("patientId", searchedUserPatientId);
      await AsyncStorage.setItem("token", response.data.token);
      navigation.navigate("Titulo");
    } catch (error) {
      console.log(error);
      alert("Credenciales inválidas");
    }
  };

  return (
    <View style={styles.containerGeneral}>
      <View style={styles.containerHeader}>
        <Header headerTitle="Iniciar Sesión" notHasBackBtn={true} />
      </View>

      <View style={styles.contenedorImagen}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: "./src/images/exalt_logo.png" }}
        />
      </View>

      <ScrollView>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            onChangeText={setUsuario}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Contraseña"
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Usuario Paciente Id"
            onChangeText={(text) =>
              setSearchedUserPatientId(parseInt(text, 10) || 0)
            }
          />
        </View>
      </ScrollView>

      <View style={styles.containerBoton}>
        <Boton texto="Iniciar Sesión" onPress={loginUser} />
      </View>

      <View style={styles.containerBoton2}>
        <Boton
          style={styles.botonText}
          texto="Registrarse"
          onPress={() => navigation.navigate("Sign Up")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGeneral: {
    display: "flex",

    backgroundColor: "#C2FFFD",
    flexDirection: "column",
    flexWrap: "space-between",

    alignItems: "center",
    width: "100%",
  },
  contenedorImagen: {
    marginTop: "100px",
  },
  containerHeader: {
    width: "100%",
  },
  containerDescripcion: {
    marginTop: "100px",
  },
  containerBoton: {
    marginTop: "90px",
  },
  containerBoton2: {
    marginBottom: "300px",
    marginTop: "50px",
  },
  botonText: {
    fontSize: "80",
  },
  input: {
    borderColor: "black",
    backgroundColor: "white",
    width: 270,
    height: 32,
    borderWidth: 1,
    padding: 10,
    margin: 20,
  },
  container: {
    marginTop: "50px",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IniciarSesionPantalla;
