import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";

import Header from "../components/Header";
import FamiliaOpciones from "../components/FamiliaOpciones";
import Boton from "../components/Boton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getQuestions = () => {
  axios
    .get("http://localhost:8080/photos/user/2")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const JuegoFamilia = ({ navigation }) => {
  const [timer, setTimer] = useState(20);
  const [level, setLevel] = useState(1);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [timerRunning, setTimerRunning] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [allCorrectAnswers, setAllCorrect] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState("");

  const getPhotos = async () => {
    var userPatient = await AsyncStorage.getItem("patientId");
    axios
      .get(`http://localhost:8080/photos/user/${userPatient}`)
      .then((response) => {
        const data = response.data;
        // reandomize the questions array
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        setQuestionsData(data);
        setCurrentQuestion(data[0]);
        setShuffledOptions(
          shuffleArray([
            data[0].incorrectAnswerA,
            data[0].incorrectAnswerB,
            data[0].incorrectAnswerC,
            data[0].correctAnswer,
          ])
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // use effect that gets the photos from the server and at the end it sets loading to false
  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning && timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 0) {
        setTimerRunning(false);
        setMessage("¡Se acabó el tiempo! Intentar otra vez...");
        setTimeout(() => {
          navigation.navigate("Familia Main-View");
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, timerRunning]);

  const checkAnswer = () => {
    setTimerRunning(false);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setMessage("¡Tu respuesta es correcta!");
      setNextEnabled(true);
    } else {
      setMessage("¡Tu respuesta no es correcta! ...");
      setTimeout(() => {
        navigation.navigate("Familia Main-View");
      }, 1000);
    }
  };

  const loadNextQuestion = () => {
    setNextEnabled(false);
    setSelectedAnswer(null);
    setMessage("");

    if (level < questionsData.length) {
      const nextQuestion = questionsData[level];
      setLevel((prevLevel) => prevLevel + 1);
      setCurrentQuestion(nextQuestion);
      setShuffledOptions(
        shuffleArray([
          nextQuestion.incorrectAnswerA,
          nextQuestion.incorrectAnswerB,
          nextQuestion.incorrectAnswerC,
          nextQuestion.correctAnswer,
        ])
      );
      setTimer(20 - level * 2);
      setTimerRunning(true);
    } else {
      setMessage("¡Felicidades! ... Has ganado el juego");
      setGameCompleted(true);
      setAllCorrect(true);
      setTimeout(() => {
        navigation.navigate("Titulo");
      }, 1500);
    }
  };

  return loading ? null : (
    <View style={styles.containerGeneral}>
      <View style={styles.containerHeader}>
        <Header headerTitle="Familia" navigation={navigation} />
      </View>

      <View style={styles.contenedor2}>
        <View style={styles.tiempo}>
          <Text>NIVEL: {level}</Text>
        </View>

        <View style={styles.nivel}>
          <Text>TIEMPO: {timer}s</Text>
        </View>
      </View>

      <View style={styles.contenedorImagen}>
        <Image
          style={{ width: 324, height: 217 }}
          source={{ uri: `data:image/jpeg;base64,${currentQuestion.photo}` }}
        />
      </View>

      <View style={styles.contenedor}>
        <Text>{currentQuestion.question}</Text>
      </View>

      {/* <FamiliaOpciones
        options={currentQuestion.options}
        onSelect={(option) => setSelectedAnswer(option)}
        selectedAnswer={selectedAnswer}
      /> */}

      <FamiliaOpciones
        options={shuffledOptions}
        onSelect={(option) => setSelectedAnswer(option)}
        selectedAnswer={selectedAnswer}
      />

      {/* <View>
        <FamiliaOpciones options={[currentQuestion.incorrectAnswerA, currentQuestion.incorrectAnswerB, currentQuestion.incorrectAnswerC, currentQuestion.correctAnswer]} />
        <Text >{currentQuestion.incorrectAnswerA}</Text>
        <Text>{currentQuestion.incorrectAnswerB}</Text>
        <Text>{currentQuestion.incorrectAnswerC}</Text>
        <Text>{currentQuestion.correctAnswer}</Text>
      </View> */}

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <View style={styles.containerBoton}>
        {!nextEnabled && (
          <Boton
            style={styles.boton1}
            texto="Comprobar"
            onPress={() => checkAnswer()}
          />
        )}
        {nextEnabled && (
          <Boton
            style={styles.boton2}
            texto="Siguiente"
            onPress={loadNextQuestion}
            disabled={!nextEnabled}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
    backgroundColor: "#C2FFFD",
    flexDirection: "column",
    flexWrap: "space-between",
    alignItems: "center",
    width: "100%",
  },
  contenedorImagen: {
    marginTop: "10px",
  },
  containerHeader: {
    width: "100%",
  },
  containerDescripcion: {
    marginTop: "100px",
  },
  botonText: {
    fontSize: "80",
  },
  input: {
    borderColor: "black",
    backgroundColor: "white",
    width: 270,
    height: 32,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    marginTop: "15px",
    width: 324,
    height: 158,
  },
  containerTexto: {
    padding: 10,
    fontSize: 14,
    fontFamily: "PT Serif",
  },
  contenedor: {
    width: 326,
    height: 42,
    marginTop: "25px",
    padding: 5,
    fontSize: 10,
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center",
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
  },
  tiempo: {
    padding: 5,
    width: 130,
    backgroundColor: "white",
    borderWidth: 1,
  },
  nivel: {
    padding: 5,
    width: 130,
    backgroundColor: "white",
    alignSelf: "flex-end",
    borderWidth: 1,
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
  containerBoton: {
    marginTop: "90px",
    flexDirection: "row",
    justifyContent: "space-around",
    width: 313,
    height: 44,
    marginBottom: 20,
  },
  boton1: {
    alignSelf: "flex-start",
  },
  boton2: {
    alignSelf: "flex-end",
  },
});

export default JuegoFamilia;
