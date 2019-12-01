import React, { useEffect, useState } from "react";
import { AsyncStorage, ScrollView, Text, RefreshControl, Button } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { fetchUpdateAsync, clearUpdateCacheExperimentalAsync } from "expo/build/Updates/Updates";

export const API_URL =  "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state";
  

export const get = async ( url, networkPriority = false) => {
  const key = encodeURIComponent(url);
  const value = await AsyncStorage.getItem(key);

  try{
    if (value !== null && !networkPriority) {
      return { data: JSON.parse(value), from: "Cache"};
    } else {
      const response = await fetch (url);
      const json = await response.json();
      await AsyncStorage.setItem(key, JSON.stringify(json));

      return {data: json, from: "API"};
    }
  }catch (error) {
    return {
      data: JSON.parse(value),
      from: "Cache",
      error: error.message,
    };
  }
}

const Exercice3 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();
  const fetchData = networkPriority => {
    setLoading(true);
    get(API_URL, networkPriority).then(data => {
      setData(data);
      setLoading(false);
    });
  };

  //Request on mount
  useEffect(() => {
    //From cache if exist
    fetchData();
    //From API
    fetchData(true);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => fetchUpdateAsync(true)}
        />
      }

      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!data && <Text>Chargement ...</Text>}
      {data && (
        <>
        {data.data && <Text>{data.data.nhits} résultats</Text> }
        <Text>Form {data.form}</Text>
        {data.error && <Text>Error: {JSON.stringify(data.error)}</Text>}
      </>
      )}
      <Text style={{ color: netInfo.isConnected ? "green" : "red" }}>
        Is online ? {netInfo.isConnected.toString()}
      </Text>
      <Button title="Clear cache" onPress={() => clearUpdateCacheExperimentalAsync(API_URL)}/>
    </ScrollView>
  );
};

export default Exercice3;