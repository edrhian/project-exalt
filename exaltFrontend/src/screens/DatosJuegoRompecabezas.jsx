import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";

import Guia_creada from "../components/guia";

import Boton from "../components/Boton";
import Header from "../components/Header";

const texto = "Esta grafica representa el nivel maximo el cual ha llegado el " +
  "paciente en el juego de rompecabezas segun los dias que ha jugado."

const DatosJuegoRompecabezas = ({navigation}) => {
  return (

    <View style={styles.containerGeneral}>

      <View style={styles.containerHeader} >
        <Header headerTitle="Rompecabezas" navigation={navigation}/>
      </View>

      <View style={styles.contenedorImagen}>
        <Image
          style={{ width: 324, height: 307 }}
          source={{ uri: "./src/images/Grafica_rompecabezas.png" }} />
      </View>
      <View style={styles.container}>

        <Text style={styles.containerTexto}> {texto} </Text>

      </View>
    </View>
  );

}

const styles = StyleSheet.create({

  containerGeneral: {
    display: "flex",
    backgroundColor: "#C2FFFD",
    flexDirection: "column",
    flexWrap: "space-between"
    , alignItems: "center"
    , width: "100%"

  }, contenedorImagen: {
    marginTop: "25px",
  }, containerHeader: {
    width: "100%",
  }, containerDescripcion: {
    marginTop: "50px"
  }
  ,
  botonText: {
    fontSize: "80",
  },
  input: {
    borderColor: "black",
    backgroundColor: "white"
    , width: 270,
    height: 32,
    borderWidth: 1,
    padding: 10,


  },
  container: {

    marginTop: "15px",
    width: 324,
    height: 158,
    backgroundColor: "white",
    borderWidth: 1
  },
  containerTexto: {

    padding: 10,
    fontSize: 14,
    fontFamily: "PT Serif"

  }
});

export default DatosJuegoRompecabezas;
