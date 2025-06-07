import React from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const Carta = (props) => {
  const onPress = () => {
    console.log("Eliges la carta!");
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.image_container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: "../src/images/gato.png" }}
      >
        <ImageBackground
          style={styles.image}
          source={{ uri: "../src/images/carta.png" }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  invisible_image: {},
  image_container: {
    width: 60,
    height: 91,
    margin: 10,
  },
});

export default Carta;
