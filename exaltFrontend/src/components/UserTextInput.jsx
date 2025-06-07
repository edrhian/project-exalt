import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const UserTextInput = (props) => {
  const [text, setText] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={newText => setText(newText)}
        placeholder={props.hint}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    backgroundColor: "white",
    width: 226,
    height: 32,
    borderWidth: 1,
    padding: 10,
  },
});

export default UserTextInput;
