import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import Header from "../components/Header";
import { Button, ScrollView } from "react-native-web";
import Boton from "../components/Boton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EstadisticaJuegoMemoria = (props) => {
  const [base64Img, setBase64Img] = useState("");
  const [base64ImgArray, setBase64ImgArray] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    "Toca el boton de 'Generar Grafica' para ver los resultados"
  );
  const [userPatientId, setUserPatientId] = useState(0);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const gameType = "MEMORY";
  //Calling fast api
  const getPaginatedScores = async () => {
    try {
      const value = await AsyncStorage.getItem("patientId");
      if (value !== null) {
        const patientId = parseInt(value, 10);
        console.log(patientId);
        setLoading(true);
        setStatusMessage("Cargando...");
        const response = await fetch(
          `http://localhost:8000/chart/scores/${patientId}/${gameType}/pagination`
        );
        const json = await response.json();
        setBase64ImgArray(json);
        setStatusMessage("Gráficas Generadas");
        setLoading(false);
      } else {
        setStatusMessage("ID de paciente no encontrado");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      console.error(
        "AVISO: Comprueba que el servicio de graficas estea encendido"
      );
      setStatusMessage("Error al cargar datos");
      setLoading(false);
    }
  };

  //On page switch
  useEffect(() => {
    setBase64Img(`data:image/png;base64,${base64ImgArray[page]}`);
  }, [page, loading]);

  return (
    <View style={styles.container}>
      <Header
        headerTitle="Datos del Juego Memoria"
        navigation={props.navigation}
      />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.h1}>{statusMessage}</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              pressed ? styles.buttonContainerPressed : styles.buttonContainer,
            ]}
            onPress={getPaginatedScores}
          >
            <Text style={styles.text} selectable={false}>
              Generar Gráfica
            </Text>
          </Pressable>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: base64Img }} style={styles.image} />
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              pressed ? styles.buttonContainerPressed : styles.buttonContainer,
            ]}
            onPress={() => setPage(0)}
          >
            <Text style={styles.text} selectable={false}>
              {"Mas Antiguo"}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              pressed ? styles.buttonContainerPressed : styles.buttonContainer,
            ]}
            onPress={() => setPage(page == 0 ? page : page - 1)}
          >
            <Text style={styles.text} selectable={false}>
              {"Anterior"}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              pressed ? styles.buttonContainerPressed : styles.buttonContainer,
            ]}
            onPress={() =>
              setPage(page == base64ImgArray.length - 1 ? page : page + 1)
            }
          >
            <Text style={styles.text} selectable={false}>
              {"Siguiente"}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              pressed ? styles.buttonContainerPressed : styles.buttonContainer,
            ]}
            onPress={() => setPage(base64ImgArray.length - 1)}
          >
            <Text style={styles.text} selectable={false}>
              {"Mas recientes"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2FFFD",
  },
  h1: {
    fontSize: 20,
    fontFamily: "PT Serif",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  image: {
    height: 600,
    width: 800,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  buttonContainer: {
    height: 44,
    width: 150,
    borderWidth: 3,
    borderColor: "#686868",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
  },
  buttonContainerPressed: {
    height: 44,
    width: 150,
    borderWidth: 5,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "PT Serif",
    alignSelf: "center",
  },
});

export default EstadisticaJuegoMemoria;
