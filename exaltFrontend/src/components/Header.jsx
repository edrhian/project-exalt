import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

const Header = (props) => {
  const onPress = () => {
    console.log("Clicked Profile icon");
  };

  const hasProfileIcon = props.hasProfileIcon;
  const notHasBackBtn = props.notHasBackBtn;

  return (
    <View style={styles.container}>
      {!notHasBackBtn &&
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()} >
          <Text style={styles.textSmall}>VOLVER</Text>
        </TouchableOpacity>
      }
      <View style={styles.containerIS}>
        <Text style={styles.text}>{props.headerTitle}</Text>
      </View>
      <View style={styles.invisibleBox}>
        {hasProfileIcon &&
          <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')}>
            <ImageBackground
              style={styles.image}
              source={{ uri: "./src/images/account_icon.png" }}
            />
          </TouchableOpacity>
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    height: 43,
    backgroundColor: "#2BC8C8",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontFamily: "PT Serif",
    alignSelf: "center",
  },
  containerIS: {
    flex: 1,
    alignItems: "flex-end",
  },
  textSmall: {
    fontSize: "10px",
    fontFamily: "PT Serif",
  },
  button: {
    borderRadius: "20px",
    backgroundColor: "white",
    padding: "5px",
    borderWidth: "4.5px",
    borderColor: "#C2FFFD",
  },
  invisibleBox: {
    width: 57.64,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default Header;
