import React from "react";
import { createStackNavigator } from "react-navigation-stack";

//IMPORT screens
import RegisterScreen from "../screens/auth/Register";
import LoginScreen from "../screens/auth/Login";
import UsernameScreen from "../screens/auth/Username";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";

import { headerStyle, headerTitleStyle } from "../theme";

//Create Routes
export default createStackNavigator(
  {
    Register: RegisterScreen,
    Login: LoginScreen,
    Username: UsernameScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: () => ({ headerStyle, headerTitleStyle })
  }
);
