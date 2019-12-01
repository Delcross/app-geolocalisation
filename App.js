import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';

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
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";
import Exo3, { get, API_URL, DISTANCE } from "./Exo3.js";


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
    marginBottom: spacing,
  },
  row: {
    flexDirection: "row",
    marginBottom: spacing,
  },
  rowIcon: {
    marginRight: 10,
    fontSize: 20,
  },
  rowText: {
    fontSize: 17,
  },
});

export const ListScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Exo3/>
  </View>
);

export const MapScreen = () => (
  <View style={styles.container}>
    <Text>Map</Text>
    <Exo4/>
    <App/>
  </View>
);

export const DetailScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Button onPress={() => navigation.push("Detail")} title="Detail" />
    <Button onPress={() => navigation.popToTop()} title="Reset" />
  </View>
);

const ListStack = createStackNavigator({
  List : ListScreen,
  Detail: DetailScreen,
});

const Navigator = createBottomTabNavigator(
  {
    List: ListStack,
    Map: MapScreen,
  },
  {
    initialRouteName: "List",
  }
);

const spacing = 10;
const Exo4 = props => {

  const {
    station_name,
    state_state,
    nbbike,
    nbebike,
    nbfreeedock,
    nbedock,
    creditcard,
    geometry,
    record_timestamp,
  } = props

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
          }}
          title={station_name}
        >
          <View style={styles.mapMarker}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>🚴</Text>
            <Text
              style={[
                styles.rowAvailability,
                {
                  color: nbbike > 0 ? "black" : "red",
                },
              ]}
            >
            {nbbike}/{nbedock}
            </Text>
          </View>
        </MapView.Marker>
      </MapView>
      <View style={styles.content}>
        <Text style={styles.title}>{station_name}</Text>
        <View style={styles.row}>
          <Text style={styles.rowIcon}>🚶</Text>
          <Text style={styles.rowText}>à 400m de vous</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowIcon}>🚴</Text>
          <Text style={styles.rowText}>{nbbike} vélos disponibles.</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowIcon}>💡</Text>
          <Text style={styles.rowText}>
            {nbebike} vélos électiques disponibles.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowIcon}>💸</Text>
          <Text style={styles.rowText}>
            {Boolean(creditcard)
              ? "Achat de ticket disponible"
              : "Achat de ticket indisponible"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowIcon}>📅</Text>
          <Text style={styles.rowText}>
            Mise à jour = {new Date(record_timestamp).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              openMap=({
                latitude: geometry.coordinates[1],
                longitude: geometry.coordinates[0],
              })
            }
          >
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


Exo4.navigationOptions = {
  title: "Vélib détail",
};

Exo4.defaultProps = {
  station_name: "Voltaire",
  state_state: "Operative",
  nbbike: 2,
  nbebike: 1,
  nbfreeedock: 30,
  nbedock: 32,
  creditcard: "yes",
  geometry: {
    coordinates: [position.coords.latitude, position.coords.longitud],
  },
  record_timestamp: "2019-11-26T10:41:00.925000+00:00",
};

export class App extends React.Component {
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
export default createAppContainer(Navigator);