import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import Boton from "../components/Boton";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SubirFoto = ({ route, navigation }) => {
  const { foto } = route.params ? route.params : "";
  const [question, setQuestion] = useState(foto?.question || "");
  const [incorrectAnsA, setIncorrectAnsA] = useState(foto?.incorrectAnswerA || "");
  const [incorrectAnsB, setIncorrectAnsB] = useState(foto?.incorrectAnswerB || "");
  const [incorrectAnsC, setIncorrectAnsC] = useState(foto?.incorrectAnswerC || "");
  const [correctAns, setCorrectAns] = useState(foto?.correctAnswer || "");
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(`data:image/jpeg;base64,${foto?.photo}` || null);
  const [imageSelected, setImageSelected] = useState(false);
  const [imgBase64, setImgBase64] = useState(foto?.photo || "");

  console.log(foto) // to check the obj --> foto

  const handleGuardar = async () => {
    try {
      // console.log("a"); // trial
      // console.log(imgBase64); // trial
      if (
        question.length == 0 ||
        incorrectAnsA.length == 0 ||
        incorrectAnsB.length == 0 ||
        incorrectAnsC.length == 0 ||
        correctAns.length == 0 ||
        image == null
      ) {
        console.log("All fields are required.");
        Alert.alert("All fields are required.");
        setMessage("All fields are required.");
        return;
      }

      const photoData = {
        // Include existing photo ID if available
        id: foto?.id || null,
        question: question,
        incorrectAnswerA: incorrectAnsA,
        incorrectAnswerB: incorrectAnsB,
        incorrectAnswerC: incorrectAnsC,
        correctAnswer: correctAns,
        photo: imgBase64,
      };

      var userPatient;
      var token;

      userPatient = await AsyncStorage.getItem("patientId");
      token = "Bearer " + (await AsyncStorage.getItem("token"));

      console.log("token:", token);
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      let response;
      if (!foto || !foto.photo) {
        response = await axios.post(
          `http://localhost:8080/photos/user/${userPatient}`,
          photoData,
          { headers }
        );
      } else {
        response = await axios.put(
          `http://localhost:8080/photos/${foto.id}`,
          photoData,
          { headers }
        );
      }

      console.log(response);
      if (response) {
        Alert.alert("Photo saved successfully.");
        setMessage("Photo saved successfully.");
        clearFields();
        navigation.goBack();
      } else {
        throw new Error("Failed to save photo.");
      }
    } catch (error) {
      console.error("Error saving photo:", error);
      Alert.alert("An error occurred while saving the photo.");
      setMessage("An error occurred while saving the photo.");
    }
  };


  const clearFields = () => {
    setQuestion("");
    setIncorrectAnsA("");
    setIncorrectAnsB("");
    setIncorrectAnsC("");
    setCorrectAns("");
    setImage(null);
    setImageSelected(false);
  };

  const handleBorrar = () => {
    // clearFields();
    Alert.alert("Confirmation", "Are you sure you want to cancel?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log("image selected");
        setImage(result.assets[0].uri);
        convertImageToBase64(result.assets[0].uri);
        setImageSelected(true);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1];
        setImgBase64(base64data);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header headerTitle={"Foto"} navigation={navigation} />
      <TouchableOpacity onPress={imageSelected ? null : selectImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.emptyImageContainer}>
            {imageSelected ? null : (
              <TouchableOpacity onPress={selectImage}>
                <Text>Select Image</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.container_formulario}>
        <TextInput
          style={styles.input}
          onChangeText={setQuestion}
          placeholder="Pregunta"
          value={question}
        />
        <TextInput
          style={styles.input}
          onChangeText={setIncorrectAnsA}
          placeholder="Opción Incorrecta 1"
          value={incorrectAnsA}
        />
        <TextInput
          style={styles.input}
          onChangeText={setIncorrectAnsB}
          placeholder="Opción Incorrecta 2"
          value={incorrectAnsB}
        />
        <TextInput
          style={styles.input}
          onChangeText={setIncorrectAnsC}
          placeholder="Opción Incorrecta 3"
          value={incorrectAnsC}
        />
        <TextInput
          style={styles.input}
          onChangeText={setCorrectAns}
          placeholder="Opción Correcta"
          value={correctAns}
        />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <View style={styles.container_botones}>
        <Boton texto="Borrar" onPress={handleBorrar} />
        <Boton texto="Guardar" onPress={handleGuardar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 217,
    width: 324,
    alignSelf: "center",
    borderColor: "#000000",
    borderWidth: 1,
    marginTop: 10,
  },
  emptyImageContainer: {
    height: 217,
    width: 324,
    alignSelf: "center",
    borderColor: "#000000",
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  container_formulario: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  container_botones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  text_input: {
    alignSelf: "center",
  },
  messageContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
  input: {
    borderColor: "black",
    backgroundColor: "white",
    width: 226,
    height: 32,
    borderWidth: 1,
    padding: 10,
  },
});

export default SubirFoto;
