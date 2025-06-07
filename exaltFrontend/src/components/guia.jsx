import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import GuiaStyle from "./GuiaStyle";

// foijefjefe

const Guia_creada = props => {

    return (
        <View style={GuiaStyle.container}>

            <View style={GuiaStyle.textContenedor}>

                <Text style={GuiaStyle.colorText}>{props.texto}</Text>
            </View>

            {/* <View style={GuiaStyle.contenedorImagen}> */}

            <Image style={GuiaStyle.imagen}
                // style={{ width: 100, height: 100, marginLeft: 15 }}
                // source={require("./ImageView.png")}
                source ={{uri:props.imagen}}
            />

            {/* </View> */}


        </View>
    );


}



export default Guia_creada;
