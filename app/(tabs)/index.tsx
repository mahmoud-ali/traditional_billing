import React from "react";

import { Avatar, Card, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import {RefreshControl, ScrollView, StyleSheet, View } from "react-native";
// import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";

export default function HomeScreen() {
  const [userData, setUserData] = React.useState({name:'',state:'',soag:''});
  const [refreshing, setRefreshing] = React.useState(false);

  SecureStore.getItemAsync('userdata',{})
  .then(function(userdata_str:any){
    if(userdata_str){
      const userdata = JSON.parse(userdata_str)
      setUserData(userdata)
    }
  }).catch((reason:any)=>{});

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);    
  }, []);

  const data=[ {value:50,label:'A'}, {value:80,label:'B'}, {value:90,label:'C'}, {value:70,label:'D'} ]  

  return (
    <>
      <ScrollView
      style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>     
        <Text variant="displaySmall">مرحباً..</Text>
  <Card.Title
    title={userData.name}
    subtitle={userData.state+' / '+userData.soag} 
    left={(props) => <Avatar.Icon {...props} icon="search" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
        {/* <Text style={styles.row}><Text style={styles.label}>المتحصل: </Text><Text> {userData.name}</Text></Text>
        <Text style={styles.row}><Text style={styles.label}>الولاية: </Text><Text> {userData.state}</Text></Text>
        <Text style={styles.row}><Text style={styles.label}>السوق: </Text><Text> {userData.soag}</Text></Text>       */}
          {/* <BarChart data = {data} adjustToWidth={true} barWidth={22} noOfSections={3} barBorderRadius={4} frontColor={'#177AD5'}/> */}
          {/* <LineChart data = {data} /> */}
          {/* <PieChart data = {data} /> */}
        </ScrollView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // justifyContent: "center", 
    margin: 10,
  },
  label: {
    fontWeight:'bold',
  },
  row: {
    marginVertical: 5,
  }
})