
import React from "react";
import { View, Image, StyleSheet } from "react-native";

// Componente para cada parte del rompecabezas
const PiezaRompecabezas = ({ imageSource,onPress }) => {
  return <Image source={imageSource} style={styles.pieza} />;
};




const Partes = ({ images }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tablero}>
        {images.map((image, index) => (
          <PiezaRompecabezas key={index} imageSource={image} />
        ))}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    display: "flex",
    
    justifyContent: "center",
    alignItems: "center",
  },
  tablero: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 324,
    height: 203,
  },
  pieza: {
    width: 162,
    height: 101.5,
  },
});

export default Partes;



/*import React from "react";
import { View, Image,TouchableOpacity,Tile, StyleSheet } from "react-native";

// Componente para cada parte del rompecabezas
const PiezaRompecabezas = ({ imageSource }) => {
  return <Image source={{uri : "./src/images/casa.png"}} style={styles.pieza} />;
};

const Partes = () => {



  return (
    <View style={styles.container}>
      <View style={styles.tablero}>
        <Image
        style={{ width: 162, height: 101.5}}
        source={{uri : "./src/images/parte1casa.png"}} />  
        <Image  style={{ width: 162, height: 101.5}} 
        source={{uri : "./src/images/parte2casa.png"}} />  
        <Image   style={{ width: 162, height: 101.5}}
         source={{uri : "./src/images/parte3casa.png"}} />  
        <Image  style={{ width: 162, height: 101.5}}
         source={{uri : "./src/images/parte4casa.png"}} /> 
   
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flex:1,
    borderWidth:1,
    justifyContent: "center",
    alignItems: "center",
  },
  tablero: {
    justifyContent:"center",
    alignItems:"center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 324, 
    height: 203, 
  },

});

export default Partes;
*/
