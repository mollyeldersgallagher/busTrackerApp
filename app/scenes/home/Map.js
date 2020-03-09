// import React from "react";
// import { Text, View, StyleSheet, Keyboard } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";
// // import PolyLine from " @mapbox/polyline";
// import Constants from "expo-constants";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
// import axios from "axios";
// const decodePolyline = require("decode-google-map-polyline");

// const LOCATION_SETTINGS = {
//   accuracy: Location.Accuracy.Balanced,
//   timeInterval: 200,
//   distanceInterval: 0
// };

// export default class Map extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: true,
//       location: {},
//       coords: {},
//       error: null,
//       errorMessage: null,
//       bus184: [],
//       pointCoords: []
//     };
//   }
//   componentDidMount() {
//     if (Platform.OS === "android" && !Constants.isDevice) {
//       this.setState({
//         errorMessage:
//           "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
//       });
//     } else {
//       this._getLocationAsync();
//     }
//   }

//   // componentWillMount() {
//   //   Location.watchPositionAsync(LOCATION_SETTINGS, location => {
//   //     this.setState((state, props) => {
//   //       const now = Date.now();
//   //       return {
//   //         ...state,
//   //         location,
//   //         prevTime: now,
//   //         timeDiff: now - state.prevTime
//   //       };
//   //     });
//   //   });
//   // }

//   _getLocationAsync = async () => {
//     try {
//       let { status } = await Permissions.askAsync(Permissions.LOCATION);
//       if (status !== "granted") {
//         this.setState({
//           errorMessage: "Permission to access location was denied"
//         });
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       this.setState({
//         location: location,
//         coords: {
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude
//         },
//         isLoading: false
//       });
//       this._getRouteDirections();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   _getRouteDirections = async () => {
//     try {
//       console.log(this.state.coords.latitude);
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.coords.latitude},${this.state.coords.longitude}&destination=53.2870,-6.2423&key=AIzaSyC4OUI6IkL88voWO_PgRHeQPswBausbuaM`
//       );

//       // const routee184 = await fetch(`http://localhost:4000/rtpi/route/184`);

//       // const busroute = await routee184.json();
//       const json = await response.json();

//       // const bus184 = busroute.results[0].stops.map(stop => {
//       //   return { latitude: stop.latitude, longitude: stop.longitude };
//       // });

//       // this.setState({
//       //   // pointCoords,
//       //   bus184
//       // });
//       console.log(json.routes[0].overview_polyline.points);
//       const points = decodePolyline(json.routes[0].overview_polyline.points);
//       console.log(points);
//       const pointCoords = points.map(point => {
//         return { latitude: point.lat, longitude: point.lng };
//       });

//       this.setState({
//         pointCoords
//       });
//       Keyboard.dismiss();
//       this.map.fitToCoordinates(pointCoords);
//       console.log(pointCoords);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyALah-gL8yd7d0RitnqoRI9kqWP4fZ1oZo&input=mcdonalds
//   render() {
//     let marker = null;
//     if (this.state.pointCoords.length > 1) {
//       marker = (
//         <Marker
//           coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
//         />
//       );
//     }
//     console.log(this.state.coords.latitude);
//     console.log(this.state.coords.longitude);
//     if (this.state.isLoading === false) {
//       return (
//         <MapView
//           ref={map => {
//             this.map = map;
//           }}
//           style={styles.mapStyle}
//           region={{
//             latitude: this.state.coords.latitude,
//             longitude: this.state.coords.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421
//           }}
//           showsUserLocation={true}
//         >
//           <Polyline
//             coordinates={this.state.pointCoords}
//             strokeWidth={5}
//             strokeColor="red"
//           />
//           {marker}
//           <Marker
//             coordinate={{
//               latitude: this.state.coords.latitude,
//               longitude: this.state.coords.longitude
//             }}
//           ></Marker>
//         </MapView>
//       );
//     } else {
//       return (
//         <View style={styles.container}>
//           <Text>Waiting...</Text>
//         </View>
//       );
//     }
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#ecf0f1",
//     paddingTop: Constants.statusBarHeight
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#34495e"
//   },
//   mapStyle: {
//     flex: 1
//     // width: Dimensions.get("window").width,
//     // height: Dimensions.get("window").height
//   }
// });
