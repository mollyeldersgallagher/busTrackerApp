import React from "react";
import { Text, View, StyleSheet, Keyboard, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";
import stopIcon from "../../../assets/stopImage.png";
const decodePolyline = require("decode-google-map-polyline");
import { useAuth } from "../../provider";
import haversine from "haversine";

export default class Trip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      points: this.props.navigation.getParam("points", {}),
      user_id: "5e61742d35c4c52bf84e753b"
    };
  }
  async componentDidMount() {
    console.log(this.state.user_id);
    //  console.log(this.state.stop);
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
    const distance = haversine(
      this.state.points.start.latlng,
      this.state.points.finish.latlng
    );
    const reward = distance % 1;
    return (
      <View style={styles.container}>
        <Text>Trip</Text>
        <Text>Start Point {JSON.stringify(this.state.points.start)}</Text>
        <Text>Finish Point {JSON.stringify(this.state.points.finish)}</Text>
        <Text>
          Distance {distance}
          Km
        </Text>
        <Text>Reward {reward} </Text>
      </View>
    );
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
