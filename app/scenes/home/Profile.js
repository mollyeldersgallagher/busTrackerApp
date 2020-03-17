import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-elements";
import { placeholder } from "react-native-basic-form/helpers/Image";
import pic from "../../../assets/placeholder.png";
const title = "hello";

const Social = ({ name }) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
);

class Profile extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={pic} style={styles.image} />
        </View>
        <Text h4 style={styles.name}>
          {title}
        </Text>
        <Text style={styles.desc}>Fashion Designer at Amelia & Co.</Text>
        <Divider style={styles.divider} />
        <Text style={styles.desc}>
          I love to travel. I have a cat named pickles. If he likes you, I
          probably will too.
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.desc}>Find me on Social here</Text>
        <View style={styles.socialLinks}>
          <Social name="snapchat" />
          <Social name="instagram" />
          <Social name="facebook-square" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  imageContainer: {
    margin: 20
  },
  image: {
    width: 100, // device width - some margin
    height: 100, // device height / 2 - some margin
    borderRadius: 20
  },
  name: {
    color: "#5E5E5E",
    alignSelf: "flex-start",
    marginLeft: 30
  },
  desc: {
    color: "#5E5E5E",
    alignSelf: "flex-start",
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14
  },
  divider: {
    backgroundColor: "#C0C0C0",
    // width: window.width - 60,
    margin: 20
  },
  socialLinks: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    // width: window.width,
    marginLeft: 40
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15
  }
});

export default Profile;
