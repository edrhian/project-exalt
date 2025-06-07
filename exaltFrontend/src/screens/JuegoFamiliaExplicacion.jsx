import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Guia_creada from "../components/guia";

import Boton from "../components/Boton";
import Header from "../components/Header";


const JuegoFamiliaExplicacion = ({ navigation }) => {
  const texto = "Este juego consiste en " +
    " recordar a los miembros de la familia, eventos especiales y la relación. " +
    " Te dan una imagen y tienes que decir quién es la " +
    " persona o a qué evento pertenece esa imagen, etc., " +
    "  eligiendo una de las opciones que aparecen debajo " +
    " de la imagen para responder a la pregunta correspondiente " +
    " teniendo en cuenta la hora del juego."
  return (

    <View style={styles.containerGeneral}>

      <View style={styles.containerHeader} >
        <Header headerTitle="Familia" navigation={navigation}/>
      </View>

      <View style={styles.containerDescripcion}>
        <Guia_creada texto={texto} imagen={"./src/images/familiaJuego.png"} />
      </View>

      <View style={styles.containerBoton}>
        <Boton texto="Jugar" onPress={() => navigation.navigate('Familia Game-View')} />
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


export default JuegoFamiliaExplicacion;
