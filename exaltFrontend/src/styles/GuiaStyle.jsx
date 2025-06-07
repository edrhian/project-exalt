
import { StyleSheet, Text, View } from "react-native";


const GuiaStyle = StyleSheet.create({
    container: {

        display: "flex",


        flexDirection: "row",

        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'black',


    },
    textContenedor: {

        display: "flex",


        flex: 1,
        width: 300,

        justifyContent: "flex-start",
        alignItems: "center",
        margin: 20,
        padding: 20,
        /* display: "flex",
         flex: 1,
         justifyContent:"flex-end",
         alignItems: "center",
 
          flexDirection: "column",
          */

    },
    colorText: {

        color: "black",
        

        fontSize: 15


    },
    contenedorImagen: {


        display: "flex",

        // flexDirection: "column",
        flex: 1,
        width: 140,
        height: 245,
        justifyContent: "flex-start",




    },
    imagen: {
        margin: 20,
        padding: 20,
        width: 140,
        height: 245,

    },

    textColor: {
        color: "black",
        fontSize: "30"

    }
})


export default GuiaStyle;