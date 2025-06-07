import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DropdownPicker from './src/components/DropdownPicker';

import DatosJuegoRompecabezas from './src/screens/DatosJuegoRompecabezas';
import EstadisticaJuegoFamilia from './src/screens/EstadisticaJuegoFamilia';
import EstadisticaJuegoMemoria from './src/screens/EstadisticaJuegoMemoria';
import JuegoMemoria from './src/screens/JuegoMemoria';
import JuegoRompecabezas from './src/screens/JuegoRompecabezas';
import ListaFotos from './src/screens/ListaFotos';
import SubirFoto from './src/screens/SubirFoto';
import IniciarSesionPantalla from './src/screens/IniciarSesionPantalla';
import Registrarse from './src/screens/Registrarse';
import AppMain from './src/screens/MainScreen';
import PerfilPantalla from './src/screens/PerfilPantalla';
import DatosDelJuego from './src/screens/DatosDelJuego';
import JuegoFamilia from './src/screens/JuegoFamilia';
import JuegoFamiliaExplicacion from './src/screens/JuegoFamiliaExplicacion';
import JuegoMemoriaExplicacion from './src/screens/JuegoMemoriaExplicacion';
import JuegoRompecabezasExplicacion from './src/screens/JuegoRompecabezasExplicacion';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        
        <Stack.Screen name="Sign In" component={IniciarSesionPantalla} />
        <Stack.Screen name="Sign Up" component={Registrarse} />
        <Stack.Screen name="Titulo" component={AppMain} />
        <Stack.Screen name="Perfil" component={PerfilPantalla} />
        <Stack.Screen name="Datos del Juego" component={DatosDelJuego} />

        <Stack.Screen name="Memoria Main-View" component={JuegoMemoriaExplicacion} />
        <Stack.Screen name="Familia Main-View" component={JuegoFamiliaExplicacion} />
        <Stack.Screen name="Puzzle Main-View" component={JuegoRompecabezasExplicacion} />

        <Stack.Screen name="Memoria Game-View" component={JuegoMemoria} />
        <Stack.Screen name="Familia Game-View" component={JuegoFamilia} />
        <Stack.Screen name="Puzzle Game-View" component={JuegoRompecabezas} />

        <Stack.Screen name="Datos del Juego-Memoria" component={EstadisticaJuegoMemoria} />
        <Stack.Screen name="Datos del Juego-Familia" component={EstadisticaJuegoFamilia} />
        <Stack.Screen name="Datos del Juego-Puzzle" component={DatosJuegoRompecabezas} />

        <Stack.Screen name="Subir Fotos" component={SubirFoto} />
        <Stack.Screen name="Foto" component={ListaFotos} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
