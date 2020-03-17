import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  Dimensions,
  Button,
  Image
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import Destinations from "../../components/Destinations";
//import { Button } from "react-native-elements";
//import CurrentLocation from "../../components/CurrentLocation";
//
import Bus from "../../components/Bus";
import stopIcon from "../../../assets/stopImage.png";
const decodePolyline = require("decode-google-map-polyline");

const GOOGLE_MAPS_APIKEY = "AIzaSyC4OUI6IkL88voWO_PgRHeQPswBausbuaM";
const LOCATION_SETTINGS = {
  accuracy: Location.Accuracy.Balanced,
  timeInterval: 200,
  distanceInterval: 0
};

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      location: {},
      coords: {},
      error: null,
      errorMessage: null,
      route: null,
      busRoute: [],
      pointCoords: [],
      stopCoords: []
    };
  }
  async componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
    await this.setState({
      route: this.props.navigation.getParam("route", {})
    });
  }

  // componentWillMount() {
  //   Location.watchPositionAsync(LOCATION_SETTINGS, location => {
  //     this.setState((state, props) => {
  //       const now = Date.now();
  //       return {
  //         ...state,
  //         location,
  //         prevTime: now,
  //         timeDiff: now - state.prevTime
  //       };
  //     });
  //   });
  // }

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      this.setState({
        location: location,
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
      this._getRouteDirections();
    } catch (error) {
      console.log(error);
    }
  };
  _getRouteDirections = async () => {
    try {
      console.log(this.state.coords.latitude);
      //   const response = await fetch(
      //     `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.coords.latitude},${this.state.coords.longitude}&destination=53.2870,-6.2423&key=AIzaSyC4OUI6IkL88voWO_PgRHeQPswBausbuaM`
      //   );

      // const routee184 = await fetch(`http://localhost:4000/rtpi/route/184`);

      // const busroute = await routee184.json();
      //   const json = await response.json();

      // const bus184 = busroute.results[0].stops.map(stop => {
      //   return { latitude: stop.latitude, longitude: stop.longitude };
      // });

      // this.setState({
      //   // pointCoords,
      //   bus184
      // });
      // console.log(json.routes[0].overview_polyline.points);
      //   const points = decodePolyline(json.routes[0].overview_polyline.points);
      //   //console.log(points);
      //   const pointCoords = points.map(point => {
      //     return { latitude: point.lat, longitude: point.lng };
      //   });
      await fetch(
        `https://bus-tracker-app-backend.herokuapp.com/rtpi/route/${this.state.route}`
      )
        .then(response => response.json())
        .then(routeInfo => {
          this.setState({
            busRoute: routeInfo.results[0].stops
          });
        })
        .catch(err => {
          response.status(400).json("Error: " + err);
          console.log(err);
        });
      //  const stopCoords

      await this.state.busRoute.map((stop, index) => {
        this.state.stopCoords.push({
          stopid: stop.stopid,
          name: stop.shortname,
          latlng: {
            latitude: parseFloat(stop.latitude),
            longitude: parseFloat(stop.longitude)
          }
        });

        // console.log(stop);
      });
      //console.log(stopCoords);

      await this.setState({
        //  stopCoords,
        isLoading: false
      });
      Keyboard.dismiss();
      // this.map.fitToCoordinates(this.state.coords);
      // await this.map.fitToCoordinates(stopCoords);
      //console.log(pointCoords);
    } catch (error) {
      console.log(error);
    }
  };
  // centerMap() {
  //   const {
  //     latitude,
  //     longitude,
  //     latitudeDelta,
  //     longitudeDelta
  //   } = thi.state.region;
  // }
  markerClick(marker) {
    console.log(marker);
    this.props.navigation.push("Realtime", {
      stop: marker.stopid
    });
  }
  //https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyALah-gL8yd7d0RitnqoRI9kqWP4fZ1oZo&input=mcdonalds
  render() {
    let markers = [];
    // if (this.state.pointCoords.length > 1) {
    //   marker = (
    //     <Marker
    //       coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
    //     />
    //   );
    // }
    console.log("hello");
    if (this.state.stopCoords.length > 1) {
      markers = this.state.stopCoords.map(marker => {
        // console.log(marker.latlng);
        return (
          <Marker
            coordinate={marker.latlng}
            onPress={() => this.markerClick(marker)}
          >
            <Image source={stopIcon} style={{ width: 12, height: 12 }} />
          </Marker>
        );
      });
    }
    //console.log(this.state.stopCoords);
    // console.log(this.state.busRoute);

    if (this.state.isLoading === false) {
      return (
        <View style={styles.container}>
          <Destinations />
          {/* <CurrentLocation
            cb={() => {
              this.centerMap();
            }}
          /> */}

          <MapView
            ref={map => {
              this.map = map;
            }}
            region={{
              latitude: this.state.coords.latitude,
              longitude: this.state.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            showsMyLocationButton={true}
            showsUserLocation={true}
            showsCompass={true}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Bus
              bus={{
                uid: null,
                location: {
                  latitude: this.state.coords.latitude,
                  longitude: this.state.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }
              }}
            />
            {/* <Polyline
            coordinates={this.state.stopCoords}
            strokeWidth={5}
            strokeColor="blue"
          /> */}
            {/* {onStart()} */}

            {/* <MapViewDirections
              origin={this.state.stopCoords[0]}
              destination={this.state.stopCoords[this.state.stopCoords - 1]}
              apikey={GOOGLE_MAPS_APIKEY}
              waypoints={this.state.stopCoords}
              splitWaypoints={true}
              mode={"DRIVING"}
              strokeWidth={3}
              strokeColor="hotpink"
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`
                );
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20
                  }
                });
              }}
              onError={errorMessage => {
                console.log("GOT AN ERROR");
              }}
            /> */}
            {/* <MapView.Marker.Animated
              coordinate={{
              latitude: this.state.coords.latitude,
              longitude: this.state.coords.longitude
            }}
              ref={marker => {
                this.marker = marker;
              }}
              style={{ width: 50, height: 50 }}
            >
              <Image
                source={require("../../../assets/bus.png")}
                style={{ width: 32, height: 32 }}
              />
            </MapView.Marker.Animated> */}
            {markers}
            {/* <Marker
            coordinate={{
              latitude: this.state.coords.latitude,
              longitude: this.state.coords.longitude
            }}
          ></Marker> */}
          </MapView>
          <Button
            title="Start Trip"
            onPress={() => {
              this.props.navigation.navigate("Trip", {
                points: {
                  start: this.state.stopCoords[0],
                  finish: this.state.stopCoords[
                    this.state.stopCoords.length - 1
                  ]
                }
                // otherParam: "anything you want here"
              });
            }}
          />
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
    backgroundColor: "white"

    // paddingTop: Constants.statusBarHeight
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  mapStyle: {
    flex: 1,
    height,
    width
  }
});
