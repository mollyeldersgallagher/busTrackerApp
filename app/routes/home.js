import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

//IMPORT SCENES
import HomeScreen from "../scenes/home/Home";
import Operator from "../scenes/home/Operator";
import BusRoute from "../scenes/home/BusRoute";
import MapScreen from "../scenes/home/Map";
import Realtime from "../scenes/home/Realtime";
import Profile from "../scenes/home/Profile";
import Trip from "../scenes/home/Trip";
import UpdateProfileScreen from "../scenes/home/UpdateProfile";

import { headerStyle, headerTitleStyle } from "../theme";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Operator: Operator,
    BusRoute: BusRoute,
    MapScreen: MapScreen,
    Realtime: Realtime,
    Profile: Profile,
    Trip: Trip,
    UpdateProfile: UpdateProfileScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: () => ({ headerStyle, headerTitleStyle })
  }
);

export default HomeStack;
