import React, { useState } from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';

const DropdownPicker = ({ hint }) => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.hint}>{hint}</Text>
        <Picker
          selectedValue={selectedOption}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
        >

          <Picker.Item label=" Select your rol: " style={styles.text} />
          <Picker.Item label="Familia" value="familia" style={styles.text} />
          <Picker.Item label="Doctor/a" value="doctor" style={styles.text} />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginBottom:28,
  },
  hint: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "PT Serif",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
  },
  picker: {
    height: 25,
    width: 226,
  },
  text: {
    fontSize: 20,
    fontFamily: "PT Serif",
    alignSelf: 'center'
  },
});

export default DropdownPicker;
