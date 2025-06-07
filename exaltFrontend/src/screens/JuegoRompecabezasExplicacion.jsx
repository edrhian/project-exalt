import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Guia_creada from "../components/guia";

import Boton from "../components/Boton";
import Header from "../components/Header";


const JuegoRompecabezasExplicacion = ({ navigation }) => {
  const texto = "El jugador tiene que encontrar " +
    " el orden correcto de las piezas, al igual que un puzzle, " +
    " tiene que juntar y mover las piezas para dar con el resultado correcto. " +
    " Hay un contador que es el tiempo limite en que hay que completar el juego. " +
    " Si se agota el tiempo y no ha conseguido acabarlo, la imagen original saldrá debajo.  "
  return (

    <View style={styles.containerGeneral}>

      <View style={styles.containerHeader} >

        <Header headerTitle="Rompecabezas" navigation={navigation}/>
      </View>

      <View style={styles.containerDescripcion}>
        <Guia_creada texto={texto} imagen={"./src/images/juegoPuzzle.png"} />

      </View>

      <View style={styles.containerBoton}>
        <Boton texto="Jugar" onPress={() => navigation.navigate('Puzzle Game-View')} />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  containerGeneral: {

    display: "flex",
    backgroundColor: "#C2FFFD",

    flexDirection: "column",
    flexWrap: "wrap"

    , alignItems: "center"
    , width: "100%"

  }, containerHeader: {

    width: "100%",



  }, containerDescripcion: {

    marginTop: "100px"

  },
  containerBoton: {

    alignSelf: "center",
    marginTop: "200px"


  }
});


export default JuegoRompecabezasExplicacion;
