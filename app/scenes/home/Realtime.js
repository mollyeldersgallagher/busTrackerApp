import React from "react";
import { Text, View, StyleSheet, Keyboard, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
//import { Tooltip, Text } from "react-native-elements";
// import PolyLine from " @mapbox/polyline";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";
import stopIcon from "../../../assets/stopImage.png";
const decodePolyline = require("decode-google-map-polyline");

export default class Realtime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      realtime: [],
      stop: this.props.navigation.getParam("stop", {})
    };
  }
  async componentDidMount() {
    console.log(this.state.stop);
    await fetch(
      `https://bus-tracker-app-backend.herokuapp.com/rtpi/realtime/${this.state.stop}`
    )
      .then(response => response.json())
      .then(realtimeInfo => {
        this.setState({
          realtime: realtimeInfo.results,
          isLoading: false
        });
      })
      .catch(err => {
        response.status(400).json("Error: " + err);
        console.log(err);
      });
    setInterval(() => {
      fetch(
        `https://bus-tracker-app-backend.herokuapp.com/rtpi/realtime/${this.state.stop}`
      )
        .then(response => response.json())
        .then(realtimeInfo => {
          this.setState({
            realtime: realtimeInfo.results,
            isLoading: false
          });
        })
        .catch(err => {
          response.status(400).json("Error: " + err);
          console.log(err);
        });
    }, 10000);
    console.log(this.state.realtime);
  }

  render() {
    // console.log(this.state.realtime);
    const results = 10;
    let dueTimes = [];
    // console.log(results);

    if (this.state.realtime.length !== 0 && this.state.isLoading === false) {
      //  console.log(results);
      dueTimes.push(
        this.state.realtime.map((singleRealtime, index) => {
          console.log("hello");
          console.log(singleRealtime);
          return (
            <Text>
              route: {singleRealtime.route},{singleRealtime.duetime} minutes
              ,dest: {singleRealtime.destination}
            </Text>
          );
        })
      );
    }
    //  console.log(dueTimes);
    if (this.state.isLoading === false) {
      return (
        <View style={styles.container}>
          <Text>Hello</Text>
          {dueTimes}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Waiting...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    paddingTop: Constants.statusBarHeight
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  mapStyle: {
    flex: 1
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height
  }
});
