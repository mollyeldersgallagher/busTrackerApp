import React from "react";
import { Image, View, Dimensions } from "react-native";
import MapView, {
  AnimatedRegion,
  Marker,
  ProviderPropType
} from "react-native-maps";
//import MapView from "react-native-maps";

const screen = Dimensions.get("window");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class Bus extends React.Component {
  constructor(props) {
    super(props);

    const bus = this.props.bus
      ? this.props.bus
      : {
          uid: "noBusPassed",
          location: { latitude: 53, longitude: -6 }
        };

    const coordinate = new AnimatedRegion({
      latitude: bus.location.latitude,
      longitude: bus.location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });

    this.state = {
      bus: bus,
      coordinate: coordinate
    };
  }
  componentDidMount() {
    setTimeout(() => {
      const { coordinate } = this.state;

      // var region = {
      //   latitude: 23.8965,
      //   longitude: 90.4126,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA
      // };

      const All_location = [
        {
          latitude: 23.8965,
          longitude: 90.4126,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        {
          latitude: 23.8989,
          longitude: 90.4126,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        {
          latitude: 23.8845,
          longitude: 90.4126,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        {
          latitude: 23.8454,
          longitude: 90.4126,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        {
          latitude: 24.8545,
          longitude: 90.4126,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      ];

      All_location.map(item => {
        doAnimattion = item => {
          // this.mapRef.animateToRegion(item, 6000);

          coordinate.timing(item).start;
        };

        doAnimattion(item);
      });
    }, 2000);
  }

  animate() {
    const { coordinate } = this.state;
    const newCoordinate = {
      latitude:
        coordinate.latitude + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
      longitude:
        coordinate.longitude + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2)
    };

    if (Platform.OS === "android") {
      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
        console.log("hello");
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  }
  render() {
    return (
      <MapView.Marker.Animated
        coordinate={this.state.coordinate}
        anchor={{ x: 0.26, y: 0.32 }}
        ref={marker => {
          this.marker = marker;
        }}
        style={{ width: 50, height: 50 }}
      >
        <Image
          source={require("../../assets/bus.png")}
          style={{ width: 15, height: 36 }}
        />
      </MapView.Marker.Animated>
    );
  }
}
