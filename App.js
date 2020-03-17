// * Description: App Entry Point
import React, { Component } from "react";
//import { AppLoading } from "expo";
import * as Font from "expo-font";

//import { Container, Text } from "native-base";

import Router from "./app/router";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      // HelveticaNeueMedium: require("./assets/fonts/HelveticaNeue-Medium.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      // return <AppLoading />;
    }
    return <Router />;
  }
}
