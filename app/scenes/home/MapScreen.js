import React from "react";
import { Text, View, StyleSheet } from "react-native";
// import MapView from "react-native-maps";
// import Marker from "react-native-maps";
import Constants from "expo-constants";
// import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      markers: null
    };
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange(mapRegion) {
    console.log(mapRegion);
    this.setState({ mapRegion });
  }

  async getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      locationResult: JSON.stringify(location),
      markers: location
    });

    // Center the map on the location we just fetched.
    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Pan, zoom, and tap on the map!</Text>

        {this.state.locationResult === null ? (
          <Text>Finding your current location...</Text>
        ) : this.state.hasLocationPermissions === false ? (
          <Text>Location permissions are not granted.</Text>
        ) : this.state.mapRegion === null ? (
          <Text>Map region doesn't exist.</Text>
        ) : (
          <Text> Map </Text>
          // <MapView
          //   style={{ alignSelf: "stretch", height: 400 }}
          //   region={this.state.mapRegion}
          //   onRegionChange={this.handleMapRegionChange}
          // >
          //   {this.state.markers.map(marker => (
          //     <Marker
          //       draggable
          //       coordinate={this.state.x}
          //       onDragEnd={e => this.setState({ x: e.nativeEvent.coordinate })}
          //     />
          //   ))}
          // </MapView>
        )}
        <Text>Location: {this.state.locationResult}</Text>
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
  }
});
