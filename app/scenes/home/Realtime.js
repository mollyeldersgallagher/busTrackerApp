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
      stop: this.props.navigation.getParam("stop", {})
    };
  }
  async componentDidMount() {
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
    // setInterval(() => {
    //   fetch(
    //     `https://bus-tracker-app-backend.herokuapp.com/rtpi/realtime/${this.state.stop}`
    //   )
    //     .then(response => response.json())
    //     .then(realtimeInfo => {
    //       this.setState({
    //         realtime: realtimeInfo.results,
    //         isLoading: false
    //       });
    //     })
    //     .catch(err => {
    //       response.status(400).json("Error: " + err);
    //       console.log(err);
    //     });
    // }, 100000);
  }

  render() {
    console.log(this.state.realtime);
    let results = 10;
    let dueTimes = [];
    if (results.length > 1) {
      dueTimes = this.state.realtime.map(singleRealtime => {
        // console.log(marker.latlng);
        return (
          <Text>
            {singleRealtime.duetime},{singleRealtime.destination}
          </Text>
        );
      });
    }

    if (this.state.isLoading === false) {
      return <View style={styles.container}>{dueTimes}</View>;
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
