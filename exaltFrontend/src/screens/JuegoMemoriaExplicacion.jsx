import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Guia_creada from "../components/guia";

import Boton from "../components/Boton";
import Header from "../components/Header";


const JuegoMemoriaExplicacion = ({ navigation }) => {
  const texto = "Este juego consiste en encontrar parejas de imagenes. Para revelar una imagen " +
    " hay que pulsar la carta y luego emparejarla tocando otra. En caso de acertar, las dos cartas desaparecen " +
    " del tablero. Inicialmente, cuenta con 3 vidas y tiene que conseguir encontrarlas antes de que lleguen a 0. "
  return (

    <View style={styles.containerGeneral}>

      <View style={styles.containerHeader} >

        <Header headerTitle="Memoria" navigation={navigation}/>
      </View>

      <View style={styles.containerDescripcion}>
        <Guia_creada texto={texto} imagen={"./src/images/juegoMemoria.png"} />

      </View>



      <View style={styles.containerBoton}>
        <Boton texto="Jugar" onPress={() => navigation.navigate('Memoria Game-View')} />
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


export default JuegoMemoriaExplicacion;
