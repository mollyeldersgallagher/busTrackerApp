import React, { Component } from "react";
import { ScrollView, FlatList, TextInput, Text, View } from "react-native";
//import react in our project
//import SelectBox from "react-native-multi-selectbox";
//import basic react native components
import SearchableDropdown from "react-native-searchable-dropdown";
import Operator from "./Operator";
//import SearchableDropdown component

export default class BusRoute extends Component {
  constructor() {
    super();
    this.state = {
      serverData: [],
      operator: "",
      routes: [],
      loading: true
      //Data Source for the SearchableDropdown
    };
    // const { operator } = route.params;
    // const { navigate } = props.navigation;
  }
  async componentDidMount() {
    // const { navigation } = this.props;
    await this.setState({
      operator: this.props.navigation.getParam("operator", {})
    });
    await fetch(
      `https://bus-tracker-app-backend.herokuapp.com/rtpi/routes/${this.state.operator.operatorreference}`
    )
      .then(response => response.json())
      .then(responseJson => {
        //Successful response from the API Call
        this.setState({
          serverData: responseJson.results,

          loading: false
          //adding the new data in Data Source of the SearchableDropdown
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    if (this.state.loading) {
      console.log(this.state.loading);
      return <Text>Loading</Text>;
    } else {
      // console.log(this.state.serverData);
      // this.serverData.map(item => {
      //   this.state.routes.push({ name: item.route });
      // });
      // item.name = route;
      //const { locations, selectedLocations, selectedValues } = this.state;
      return (
        <View>
          <Text>{this.state.operator.operatorname} BUS</Text>

          <Text style={{ marginLeft: 10 }}>
            Searchable Dropdown from Dynamic Array from Server
          </Text>
          <SearchableDropdown
            onTextChange={text => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={item => {
              this.props.navigation.push("MapScreen", {
                route: item.route
              });
              alert(JSON.stringify(item.route));
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ padding: 5 }}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              backgroundColor: "#FAF7F6"
            }}
            itemStyle={{
              //single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: "#FAF9F8",
              borderColor: "#bbb",
              borderWidth: 1
            }}
            itemTextStyle={{
              //single dropdown item's text style
              color: "#222"
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: "50%"
            }}
            items={this.state.serverData}
            //mapping of item array
            defaultIndex={2}
            //default selected item index
            placeholder="placeholder"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
            setSort={(item, searchedText) =>
              item.route.toLowerCase().indexOf(searchedText.toLowerCase()) > -1
            }
          />
        </View>
      );
    }
  }
}
