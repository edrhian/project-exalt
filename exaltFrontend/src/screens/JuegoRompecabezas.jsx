import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";

import Guia_creada from "../components/guia";
// hola
import Boton from "../components/Boton";
import Header from "../components/Header";

import FamiliaOpciones from "../components/FamiliaOpciones";

import Puzzle from "./Puzzle";


const JuegoRompecabezas = ({ navigation }) => {

  let maxNivel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [nivel, setNivel] = useState(1);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [imagenesEnteras, setImagenesEnteras] = useState()

  const [mensajeTiempoAgotado, setMensajeTiempoAgotado] = useState('');
  const [mnsJuegoCompletado, setMnsJuegoCompletado] = useState('')


  const cambiarNivel = () => {

    if(nivel<maxNivel.length){

      const nivelN = nivel +1;
      setTiempoRestante(10)
setNivel(nivelN)
asignarImagenSolucionNivel(nivel) 

    }

  }

  const decrementarTiempo = () => {
    if (tiempoRestante > 0) {
      setTiempoRestante(tiempoRestante - 1);

    } else if (tiempoRestante == 0 && nivel != 10) {

      setMensajeTiempoAgotado("Se acabo el tiempo");


    } else if (tiempoRestante == 0 && nivel == 10) {
      setMnsJuegoCompletado("Se acabo el tiempo, has completado todos los niveles!");

    } else if(tiempoRestante==0){
      
   setMensajeTiempoAgotado("Se acabo el tiempo");
   if(tiempoRestante==0){
    setMnsJuegoCompletado("Has completado todos los niveles!")
   }
     // return {mensajeTiempoAgotado};
    }else{
      ;

    }

  };




  const asignarImagenSolucionNivel = (nivel) => {

    switch (nivel) {
      case 1: return [<Image source=  {{ uri: "./src/images/casa_solu.png" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]
      
    
        break;
      case 2: return [<Image source={{ uri: "./src/images/paisaje.png" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]
 
        break;
      case 3: 
      return  [<Image source={{ uri: "./src/images/hoja3.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]
     

        break;
      case 4: return [<Image source={{ uri: "./src/images/edificios.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]
        break;
      case 5:return [<Image source={{ uri: "./src/images/leon.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]

        break;
      case 6:return [<Image source={{ uri: "./src/images/nemo.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]

        break;
      case 7:return [<Image source={{ uri: "./src/images/safari.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]

        break;
      case 8: return [<Image source={{ uri: "./src/images/bosque_verde.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]

        break;
      case 9: 
        break;
      case 10:
        break;

    }

  }
  
  
  useEffect(() => {

    const temporizador = setInterval(decrementarTiempo, 1000);

    return () => clearInterval(temporizador);
  }, [tiempoRestante]);




  
  return (

    <View style={styles.containerGeneral}>

      <View style={styles.containerHeader} >

        <Header headerTitle="Rompecabezas" navigation={navigation} />
      </View>

      <View style={styles.contenedor2}>


        <View style={styles.tiempo}>
          <Text> NIVEL: {nivel}</Text>
        </View>

        <View style={styles.nivel}>
          <Text> TIEMPO: {tiempoRestante}s</Text>
        </View>

      </View>

      <View style={styles.contenedorImagen}>


        <Puzzle nivel={nivel} />
{asignarImagenSolucionNivel(nivel)}

      </View>
  



      <View>
        <Text style={{ padding: 20, fontSize: 25, fontFamily: "PT Serif", color: "#000000", textAlign: "center" }}> {mnsJuegoCompletado}</Text>

      </View>
      <View >
        <Text style={{ padding: 20, fontSize: 25, fontFamily: "PT Serif", color: "#FF0000", textAlign: "center" }}> {mensajeTiempoAgotado}</Text>


      </View>

  
  <View style={styles.containerBoton}>

    <Boton style={styles.boton2} onPress={() => cambiarNivel()} texto="Siguiente"/>
     </View>

    </View>


  )
};


const styles = StyleSheet.create({

  containerGeneral: {
    display: "flex",
    backgroundColor: "#C2FFFD",
    flexDirection: "column",
    flexWrap: "space-between"
    , alignItems: "center"
    , width: "100%"
  }, contenedorImagen: {
    marginTop: "30px",
  }, containerHeader: {
    width: "100%",
  }, containerDescripcion: {
    marginTop: "100px"
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
    //borderRadius: 10,
    padding: 10,
  },
  container: {


    marginTop: "15px",

    width: 324,
    height: 158,

    /* flex: 1,
     alignItems: 'center',
     justifyContent: 'center',*/

  },
  containerTexto: {
    padding: 10,
    fontSize: 14,
    fontFamily: "PT Serif"
  },
  contenedor: {
    width: 324,
    height: 30,
    marginTop: "25px",
    padding: 5,
    fontSize: 8,
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center"
  },
  contenedor2: {
    display: "flex",
    backgroundColor: "#C2FFFD",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 324,
    height: 30,
    marginTop: "15px",
    fontSize: 8,
  }, tiempo: {
    padding: 5,
    width: 130, backgroundColor: "white",

    borderWidth: 1
  },
  nivel: {
    padding: 5,
    width: 130,
    backgroundColor: "white",
    alignSelf: "flex-end",
    borderWidth: 1
  },
  containerBoton: {


    marginTop: "10px",

    // flexDirection:"row",
    alignSelf: "center",

    // justifyContent:"space-around",


    width: 313,
    height: 44


  },
  boton1: {

    alignSelf: "flex-start"


  }
  , boton2: {
    alignSelf: "flex-end"
  },
  contenedorTextoMns:
  {
    alignSelf: "center"

  }

});

  
export default JuegoRompecabezas;
