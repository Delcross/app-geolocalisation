import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";

const spacing = 10;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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


const Exercice4 = props => {

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


Exercice4.navigationOptions = {
  title: "Vélib détail",
};

Exercice4.defaultProps = {
  station_name: "Voltaire",
  state_state: "Operative",
  nbbike: 2,
  nbebike: 1,
  nbfreeedock: 30,
  nbedock: 32,
  creditcard: "yes",
  geometry: {
    coordinates: [2.275721, 48.865983],
  },
  record_timestamp: "2019-11-26T10:41:00.925000+00:00",
};

export default Exercice4;

export const getPosition = async() => {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout:20000, maximumAge: 2000 }
    );
  });
};

export const getVelibsAroundMe = async () => {
  const position = await getPosition();
  const requestUrl =
    API_URL +
    `&geofilter.distance=${position.coords.latitude},${position.coords.longitude},${DISTANCE}`;
  console.log(position);

  return get(requestUrl);
};