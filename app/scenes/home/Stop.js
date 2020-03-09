import React, { Component } from "react";
import {
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
  AsyncStorage
} from "react-native";
import axios from "axios";

export default class Stop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stopInfo: [],
      loading: true,
      error: null
    };
  }
  componentDidMount = async () => {
    try {
      const response = await fetch("http://localhost:4000/rtpi/4207");
      const data = await response.json();
      const stopInfo = data.results[0];

      console.log("hello");

      this.setState({ loading: false, stopInfo });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };
  render() {
    console.log(this.state.stopInfo);
    let stopInfo = JSON.stringify(this.state.stopInfo);
    return (
      <View style={styles.container}>
        <Text>home map</Text>
        <Text>{stopInfo}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  }
});
