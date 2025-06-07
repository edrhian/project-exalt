import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const FamiliaOpciones = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handlePress = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    const firstRowOptions = options.slice(0, 2);
    const secondRowOptions = options.slice(2);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {firstRowOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button, 
                            index !== 0 ? { marginLeft: 10 } : null,
                            selectedOption === option ? styles.selectedButton : null
                        ]}
                        onPress={() => handlePress(option)}
                    >
                        <Text style={styles.buttonText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {secondRowOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button,
                            { marginTop: 10, marginLeft: index !== 0 ? 10 : 0 },
                            selectedOption === option ? styles.selectedButton : null
                        ]}
                        onPress={() => handlePress(option)}
                    >
                        <Text style={styles.buttonText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        marginVertical: 10,
    },
    button: {
        padding: 10,
        borderWidth: 3,
        alignItems: 'center',
        width: 140,
        height: 44,
        borderColor: '#686868',
        borderRadius: 5,
        backgroundColor: 'FFFFFF',
    },
    selectedButton: {
        borderColor: '000000',
        borderWidth: 5,
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "PT Serif",
        alignSelf: "center",
    },
});

export default FamiliaOpciones;
