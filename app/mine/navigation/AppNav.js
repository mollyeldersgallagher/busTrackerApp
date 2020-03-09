import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

//IMPORT screens
import HomeScreen from "../screens/home/Home";
import Details from "../screens/home/Details";
import UpdateProfileScreen from "../screens/home/UpdateProfile";

import { headerStyle, headerTitleStyle } from "../theme";

export default createMaterialBottomTabNavigator(
  {
    Home: HomeScreen,
    // Bus: Bus,
    UpdateProfile: UpdateProfileScreen,
    Details: Details
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: () => ({ headerStyle, headerTitleStyle })
  }
);
