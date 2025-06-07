import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Boton from "../components/Boton";
import Header from "../components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListaFotos = ({ navigation }) => {
  const [listaFotos, setListaFotos] = useState([]);

  const getPhotos = async () => {
    var token;
    var userPatient = await AsyncStorage.getItem("patientId");
    console.log("patientid: " + userPatient);
    token = "Bearer " + (await AsyncStorage.getItem("token"));

    await axios
      .get(`http://localhost:8080/photos/user/${userPatient}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setListaFotos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const mostrarFotos = () => {
    return (
      <ScrollView>
        {listaFotos.map((foto, index) => (
          <Pressable key={index} onPress={() => navigation.navigate("Subir Fotos", { foto: foto })}>
            <Text>{foto.id}</Text>
            <Image
              style={styles.imagen}
              source={{ uri: `data:image/jpeg;base64,${foto.photo}` }}
            />
          </Pressable>
        ))}
      </ScrollView>
    );
  };

  {
    console.log("Lista de fotos:", listaFotos);
  }

  return (
    <View style={styles.container}>
      <Header headerTitle="Lista de fotos" navigation={navigation} />
      <View style={styles.container_boton}>
        <Boton
          texto="Añadir +"
          onPress={() => navigation.navigate("Subir Fotos")}
        />
      </View>

      <View style={styles.container_imagenes}>{mostrarFotos()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2FFFD",
  },
  container_boton: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 10,

    alignItems: "flex-end",
  },
  container_imagenes: {
    flex: 8,
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#000000",
    flexWrap: "wrap",
    marginHorizontal: 30,
    marginVertical: 15,
  },
  container_individual: {
    margin: 10,
    width: "50px",
    height: "50px",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    // borderColor: "#000000",
    borderColor: "black",
  },
  espacio_entre_imagenes: {
    display: "inherit",
    flexWrap: "wrap",
    width: "150px",
    height: "150px",
    backgroundColor: "yellow",
    margin: "5px",
  },
  imagen: {
    width: 150,
    height: 150,
  },
});

export default ListaFotos;
