import React, { Component } from "react";
import {
  ScrollView,
  FlatList,
  Button,
  TextInput,
  Text,
  View
} from "react-native";

export default class Operator extends Component {
  constructor() {
    super();
    this.state = {
      serverData: []
      // navigate = props.navigation
      //Data Source for the SearchableDropdown
    };
    //const { navigate } = this.props.navigation;
  }
  componentDidMount() {
    fetch("https://bus-tracker-app-backend.herokuapp.com/rtpi/operators")
      .then(response => response.json())
      .then(responseJson => {
        //Successful response from the API Call
        this.setState({
          serverData: responseJson.results
          //adding the new data in Data Source of the SearchableDropdown
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    console.log(this.state.serverData);

    return (
      <View>
        <Text> Select Operator</Text>
        {this.state.serverData.map(operator => {
          return (
            <View>
              <Button
                title={operator.operatorname}
                onPress={() => {
                  this.props.navigation.navigate("BusRoute", {
                    operator: operator
                    // otherParam: "anything you want here"
                  });
                }}
              />
            </View>
          );
        })}
      </View>
    );
  }
}
