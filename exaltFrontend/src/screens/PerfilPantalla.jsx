import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";

import Guia_creada from "../components/guia";

import Boton from "../components/Boton";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PerfilPantalla = ({ navigation }) => {
  const [loading, setLoading] = useState("");
  const [patientId, setUserPatientId] = useState(-1);
  const [data, setData] = useState([]);

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem("patientId");
      await AsyncStorage.removeItem("token");
      navigation.navigate("Sign In");
    } catch (error) {
      console.log("hubo un error en perfilpantalla");
      console.log(error);
    }
  };

  const cargarPerfil = async () => {
    const value = await AsyncStorage.getItem("patientId");
    if (value !== null) {
      const thisId = parseInt(value, 10);
      // setUserPatientId(thisId);
      axios
        .get(`http://localhost:8080/userPatient/${thisId}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  return loading ? null : (
    <View style={styles.containerGeneral}>
      <Header headerTitle="Perfil" navigation={navigation} />

      <View style={styles.contenedorImagen}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: "./src/images/user.png" }}
        />
      </View>

      <View style={styles.containerDatos}>
        <Text style={styles.infoText}>DATOS DEL PACIENTE</Text>
        <Text style={styles.infoText}>{`ID: ${data.id}`}</Text>
        <Text style={styles.infoText}>
          {`NOMBRE COMPLETO: ${data.fullName}`}
        </Text>
        <Text style={styles.infoText}>{`DNI: ${data.dni}`}</Text>
        <Text style={styles.infoText}>{`HOSPITAL: ${data.hospital}`}</Text>
      </View>

      <Boton texto="Subir Fotos" onPress={() => navigation.navigate("Foto")} />

      <Boton
        texto="Datos Juegos"
        onPress={() => navigation.navigate("Datos del Juego")}
      />

      <Boton texto="Cerrar Sesión" onPress={cerrarSesion} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
    backgroundColor: "#C2FFFD",
  },
  contenedorImagen: {
    marginTop: "100px",
    alignSelf: "center",
  },
  containerBoton: {
    marginTop: "80px",
  },
  containerBoton2: {
    marginBottom: "300px",
    marginTop: "50px",
  },
  containerDatos: {
    marginTop: "50px",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    width: "50%",
    padding: 10,
    alignSelf: "center",
  },
  textoContenedorDatos: {
    marginTop: "10px",
  },
  infoText: {
    marginTop: 5,
  },
});

export default PerfilPantalla;
