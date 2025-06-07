import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Boton from "../components/Boton";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
Debido a la complejidad del codigo, he puesto demasiados comentarios para entenderlo
Ademas esta panatlla actualizada no contiene el componente 'carta' debido a que tenia
dificultades para llevar properties del componente a otro
*/

//Funcion que mezcla el array de cartas
const mezclar = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//Funcion que pone las cartas mezcladas en el tablero
//Problema actual: En el nivel 2 hay la misma cantidad de cartas que en el nivel 1, pero luego sube 2 cartas cada nivel
const ponerCartas = (nivel) => {
  var cartas = [];

  const cantidadDeParejas = nivel + 1;

  for (let i = 1; i < cantidadDeParejas + 1; i++) {
    cartas = [...cartas, i];
    cartas = [...cartas, i];
  }

  const cartasRandom = mezclar(cartas);
  return cartasRandom.map((numeroCarta, index) => ({
    id: index,
    numeroCarta: numeroCarta,
    estaGirada: false,
  }));
};

const JuegoMemoria = ({ navigation }) => {
  const [nivel, setNivel] = useState(1);
  // El array que pone las cartas dentro del tablero
  const [cartas, setCartas] = useState(ponerCartas(nivel));
  //El array que maneja que cartas se ha seleccionado
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [haGanado, setHaGanado] = useState(false);
  const [haPerdido, setHaPerdido] = useState(false);
  const [vidas, setVidas] = useState(3);
  const [aciertos, setAciertos] = useState(0);
  const [patientId, setPatientId] = useState(-1);
  const [data, setData] = useState([]);

  useEffect(() => {
    getUserPatient();
  }, []);

  const getUserPatient = async () => {
    const value = await AsyncStorage.getItem("patientId");
    if (value !== null) {
      setPatientId(value);
    }
  };

  //Funcion que se ejecuta cada vez que se toca una carta
  const onClickCarta = (carta) => {
    if (
      !haGanado &&
      cartasSeleccionadas.length < 2 &&
      !carta.estaGirada &&
      !haPerdido
    ) {
      //Añadimos la carta seleccionada a un array de cartas seleccionadas actualizadas
      //Evitar error que no gira las cartas despues de fallar
      const cartasSeleccionadasActualizadas = [...cartasSeleccionadas, carta];
      /*Este array recorre y copia el array original y mira si la carta seleccionada es la carta en la posicion actual de su cursor
      Si se cumple esta condicion, gira esta carta, si no, no hace nada y devuelve la carta.
      */
      const cartasActualizadas = cartas.map((c) =>
        c.id == carta.id ? { ...c, estaGirada: true } : c
      );

      //Cambiamos el array viejo por el nuevo
      setCartasSeleccionadas(cartasSeleccionadasActualizadas);
      //setCartas actualiza el tablero con las cartas actualizadas
      setCartas(cartasActualizadas);

      //Se han seleccionado dos cartas?
      if (cartasSeleccionadasActualizadas.length === 2) {
        //Comparacion de los numeros de las cartas
        if (
          cartasSeleccionadasActualizadas[0].numeroCarta ===
          cartasSeleccionadasActualizadas[1].numeroCarta
        ) {
          //En caso de acertar, aumentar aciertos y limpiar array
          setAciertos(aciertos + 1);
          setVidas(vidas + 1);
          setCartasSeleccionadas([]);
        } else {
          //En caso de errar
          setTimeout(() => {
            /*
            Este nuevo array recorre y copia el array de cartas actualizadas
            y a la misma vez recorre el array de cartasSeleccionadasActualizadas
            c => carta actual de cartasActualizadas
            s => carta actual de cartasSeleccionadasActualizadas
            En caso de que coincidan los ids de estas cartas, su estado cambia a NO girada y se guarda al array 'cartasGiradas'
            En caso de que no coincidan, simplemente las añade sin girarlas
            */
            const cartasGiradas = cartasActualizadas.map((c) =>
              cartasSeleccionadasActualizadas.some((s) => s.id == c.id)
                ? { ...c, estaGirada: false }
                : c
            );
            setCartasSeleccionadas([]);
            //Vuelve a renderizar las cartas en el tablero
            setCartas(cartasGiradas);
            setVidas(vidas - 1);
          }, 1000);
        }
      }
    }
  };

  //Un useEffect hook que se ejecuta cada vez que 'aciertos' sea actualizado
  useEffect(() => {
    //En caso de descubrir todas las parejas
    if (aciertos * 2 === cartas.length) {
      setHaGanado(true);
      GanarPartida();
    }
  }, [aciertos]);

  //Un useEffect hook que se ejecuta cada vez que 'vidas' sea actualizada
  useEffect(() => {
    if (vidas == 0) {
      setHaPerdido(true);
      PerderPartida();
    }
  }, [vidas]);

  const GanarPartida = () => {
    console.log("HAS GANADO!");
  };

  const PerderPartida = () => {
    console.log("HAS PERDIDO");

    let dia = new Date().getDate();
    if (dia < 10) {
      dia = `0${dia}`;
    }
    let mes = new Date().getMonth() + 1;
    if (mes < 10) {
      mes = `0${mes}`;
    }
    let anyo = new Date().getFullYear();
    let hoy = `${anyo}-${mes}-${dia}`;

    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    console.log(hoy);

    fetch(`http://localhost:8080/scores/${patientId}/MEMORY/${hoy}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(`Se ha encontrado un registro de este dia: ${hoy}`);
        id = json["id"];
        max_level = json["maxLevel"];

        console.log("id: " + id);
        console.log(max_level);
        console.log(json);

        if (id !== undefined && max_level < nivel) {
          console.log("NUEVA PUNTACUON MAXIMA! Guardando nueva puntuacion...");
          fetch(`http://localhost:8080/scores/${id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: new Date(),
              maxLevel: nivel,
              gameType: "MEMORY",
            }),
          });
        } else {
          console.log("No se ha superado la nueva puntuacion");
        }
      })
      .catch((error) => {
        console.log(`No hay registros de este dia: ${hoy}`);
        console.log(`Guardando la puntuacion de hoy...`);
        fetch(`http://localhost:8080/scores/${patientId}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: new Date(),
            maxLevel: nivel,
            gameType: "MEMORY",
          }),
        });
      });
  };

  //Luego de ir a siguiente nivel, restablecer las variables
  const IrSiguienteNivel = () => {
    console.log("Yendo a siguiente nivel");
    setAciertos(0);
    setVidas(3);
    setHaGanado(false);
    setHaPerdido(false);
    setNivel(nivel + 1);
    setCartasSeleccionadas([]);
    setCartas(ponerCartas(nivel));
  };

  return (
    <View style={styles.containerGeneral}>
      <View style={styles.containerHeader}>
        <Header headerTitle="Memoria" navigation={navigation} />
      </View>

      <View style={styles.container_info}>
        <View style={styles.tiempo}>
          <Text>NIVEL: {nivel}</Text>
        </View>
        <View style={styles.vidas}>
          <Text>VIDAS: {vidas}</Text>
        </View>
      </View>

      <View style={styles.container_cartas}>
        {cartas.map((carta) => (
          <TouchableOpacity
            style={styles.container}
            key={carta.id}
            onPressOut={() => onClickCarta(carta)}
          >
            {/* Ternaria */}
            {carta.estaGirada ? (
              <Text style={styles.text}>{carta.numeroCarta}</Text>
            ) : (
              <Image
                style={styles.image}
                source={{ uri: "../src/images/carta.png" }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      {haGanado ? (
        <View style={styles.end_game_container}>
          <Text style={styles.winning_text}>HAS COMPLETADO ESTE NIVEL!</Text>
          <Boton texto="Siguiente" onPress={IrSiguienteNivel} />
        </View>
      ) : null}
      {haPerdido ? (
        <View style={styles.end_game_container}>
          <Text style={styles.losing_text}>HAS PERDIDO ESTE NIVEL</Text>
          <Boton
            texto="Volver"
            onPress={() => navigation.navigate("Memoria Main-View")}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
    backgroundColor: "#C2FFFD",
    alignItems: "center",
  },
  containerHeader: {
    width: "100%",
  },
  container_cartas: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",

    alignItems: "center",
    justifyContent: "center",

    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",

    marginVertical: 30,
    paddingVertical: 15,
    marginHorizontal: 30,
  },
  container_info: {
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
  vidas: {
    padding: 5,
    width: 130,
    backgroundColor: "white",
    alignSelf: "flex-end",
    borderWidth: 1,
  },
  containerBoton: {
    marginTop: "90px",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    width: 313,
    height: 44,
  },
  boton1: {
    alignSelf: "flex-start",
  },
  boton2: {
    alignSelf: "flex-end",
  },
  container: {
    width: 100,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  winning_text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#07db00",
  },
  losing_text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#db0000",
  },
  end_game_container: {
    flex: 1,
  },
});

export default JuegoMemoria;
