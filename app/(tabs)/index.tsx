import React from "react";

import { Text,Box } from "@react-native-material/core";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const [userData, setUserData] = React.useState({name:'',state:'',soag:''});

  SecureStore.getItemAsync('userdata',{})
  .then(function(userdata_str:any){
    if(userdata_str){
      const userdata = JSON.parse(userdata_str)
      setUserData(userdata)
    }
  }).catch((reason:any)=>{});

  return (
    <SafeAreaView>
      <Box p={10}>
      <Text variant="h4">مرحباً..</Text>
        <Text style={styles.wraper}><Text style={styles.label}>المتحصل: </Text><Text> {userData.name}</Text></Text>
        <Text style={styles.wraper}><Text style={styles.label}>الولاية: </Text><Text> {userData.state}</Text></Text>
        <Text style={styles.wraper}><Text style={styles.label}>السوق: </Text><Text> {userData.soag}</Text></Text>      
      </Box>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wraper: {
    flexDirection:'row',
  },
  label: {
    fontWeight:'bold',
  }
})