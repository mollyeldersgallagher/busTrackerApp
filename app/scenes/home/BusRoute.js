import React, { Component } from "react";
import { ScrollView, FlatList, TextInput, View, Text } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import Operator from "./Operator";
import { ListItem, SearchBar } from "react-native-elements";
import avatar from "../../../assets/stopImage.png";

export default class BusRoute extends Component {
  constructor() {
    super();
    this.state = {
      serverData: [],
      operator: "",
      routes: [],
      loading: true,
      search: ""
    };
  }
  async componentDidMount() {
    await this.setState({
      operator: this.props.navigation.getParam("operator", {})
    });
    await fetch(
      `https://bus-tracker-app-backend.herokuapp.com/rtpi/routes/${this.state.operator.operatorreference}`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          serverData: responseJson.results,
          loading: false
          //search: ""
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  // searchFilterFunction = text => {
  //   const filteredRoutes = this.state.serverData.filter(item => {
  //     console.log(item.route);
  //     return item.route.toLowerCase().indexOf(text) !== -1;
  //   });

  //   this.setState({ serverData: filteredRoutes });
  // };
  handleSearchInput = text => {
    this.setState({
      search: text
    });
  };

  render() {
    const filteredRoutes = this.state.serverData.filter(item => {
      return item.route.toLowerCase().indexOf(this.state.search) !== -1;
    });
    if (this.state.loading) {
      console.log(this.state.loading);
      return <Text>Loading</Text>;
    } else {
      return (
        <View>
          <Text>{this.state.operator.operatorname} BUS</Text>

          <Text style={{ marginLeft: 10 }}>
            Searchable Dropdown from Dynamic Array from Server
          </Text>
          <SearchBar
            placeholder="Type Here..."
            value={this.state.search}
            onChangeText={text => this.handleSearchInput(text)}
          />
          {/* <View style={{ flex: 1 }}> */}
          <FlatList
            data={filteredRoutes}
            renderItem={({ item }) => (
              <ListItem
                badge={{
                  value: 3,
                  textStyle: { color: "white" },
                  containerStyle: { marginTop: -20 }
                }}
                title={`${item.route}`}
                onPress={() => {
                  this.props.navigation.push("MapScreen", {
                    route: item.route
                  });
                  alert(JSON.stringify(item.route));
                }}
                // subtitle={item.email}
              />
            )}
            keyExtractor={item => item.route}
            //ItemSeparatorComponent={this.renderSeparator}
            // ListHeaderComponent={this.renderHeader}
          />
          {/* </View> */}
          {/* <SearchableDropdown
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
          /> */}
        </View>
      );
    }
  }
}
