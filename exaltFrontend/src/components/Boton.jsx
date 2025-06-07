import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";

const Boton = props => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const onPressIn = () => {
    setIsButtonPressed(true);
  };

  const onPressOut = () => {
    setIsButtonPressed(false);
    if (props.onPress) {
      props.onPress();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.buttonContainer,
          isButtonPressed && styles.buttonContainerPressed,
        ]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Text style={styles.text} selectable={false}>
          {props.texto}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    height:44,
    width:150,
    borderWidth: 3,
    borderColor: "#686868",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonContainerPressed: {
    borderWidth:5,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "PT Serif",
    alignSelf: "center",
  },
});

export default Boton;