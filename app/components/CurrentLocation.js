import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    const bottom = props.bottom ? this.props.bottom : 65;
  }
  render() {
    const cb = props.cb
      ? props.cb
      : () => console.log("callback function not ...");
    const bottom = props.bottom ? this.props.bottom : 65;

    return (
      // <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={(styles.container, { top: HEIGHT.bottom })}>
        <MaterialIcons
          name="my-location"
          color="#000000"
          size={25}
          onPress={() => {
            cb();
          }}
        />
      </View>
      // </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    flexDirection: "row",
    width: 45,
    height: 45,
    borderRadius: 50,
    left: WIDTH - 60,
    //shadowColor: "#000000",
    backgroundColor: "white",
    alignItems: "center",
    //shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
