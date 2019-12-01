import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Button,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 200,
    width: Dimensions.get("window"). width,
  },
  mapMarker: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 30,
  },
  row: {
    flexDirection: "row",
  },
  rowIcon: {
    marginRight: 10,
    fontSize: 20,
  },
  rowText: {
    fontSize: 17,
  },
});

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      ready: false,
      where : {lat:null, lng:null},
      error: null
    }
  }
  componentDidMount(){
    let geoOption = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60 * 60 * 24
    }
    this.setState({ready:false, error: null});
    navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOption);
   }
  geoSuccess = (position) => {
    console.log(position.coords.latitude);

    this.setState({
      ready:true,
      where: {lat: position.coords.latitude, lng: position.coords.longitude}
    })
  }
  geoFailure = (err) => {
    this.setState({error: err.message});
  }
  render() {
    return (
      <View style={styles.container}>
        { !this.state.ready && (
          <Text style={styles.container}>

          </Text>
        )}
        { this.state.error && (
          <Text style={styles.container}>[this.state.error]</Text>
        )}
        { this.state.ready && (
          <Text style={styles.container}>{
            `latitude: ${this.state.where.lat}
            longitude: ${this.state.where.lng}`
          }</Text>
        )}
      </View>
    );
  }
}
