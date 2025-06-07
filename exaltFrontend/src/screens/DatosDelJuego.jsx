import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Boton from "../components/Boton";
import Header from "../components/Header";


const DatosDelJuego = ({ navigation }) => {
    
    return (
        <View style={styles.containerGeneral}>
            <Header headerTitle="Datos del Juego" navigation={navigation}/>
            <View style={styles.containerDescripcion}>
                <Image
                    style={styles.images}
                    source={{ uri: "./src/images/datosDelJuego.png" }}
                />
            </View>

            <View style={styles.containerBoton}>
                <View style={styles.row}>
                    <Boton texto="Memoria" onPress={() => navigation.navigate('Datos del Juego-Memoria')} />
                </View>
                <View style={styles.space} />
                <View style={styles.row}>
                    <Boton texto="Familia" onPress={() => navigation.navigate('Datos del Juego-Familia')} />
                </View>
                <View style={styles.space} />
                <View style={styles.row}>
                    <Boton texto="Puzzle" onPress={() => navigation.navigate('Datos del Juego-Puzzle')} />
                </View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    containerGeneral: {
        flex: 1,
        backgroundColor: "#C2FFFD",
    },
    containerDescripcion: {
        display: "flex",
        flex: 1,
        marginTop: "5%",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBoton: {
        display: "flex",
        marginTop: "10",
        marginBottom: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    images: {
        alignItems: "center",
        height: 101,
        width: 101,
    },
    space: {
        height: 70,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },
});

export default DatosDelJuego;
