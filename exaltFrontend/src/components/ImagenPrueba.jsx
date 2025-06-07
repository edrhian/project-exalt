import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Prueba = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.piece}> 
         <Image source={{uri : "./src/images/parte1casa.png"}} style={styles.pieceImage} />  
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 324,
    height: 203,
    borderColor: 'red',
    borderWidth: 1,
  },
  piece: {
    width: 162,
    height: 101.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  pieceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Prueba;
