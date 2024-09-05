import React from "react";

import { Flex,Text,Box } from "@react-native-material/core";

import * as SecureStore from 'expo-secure-store';

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
    <Flex fill>
      <Box h={100} mt={20} p={10}>
      <Text variant="h4">مرحباً..</Text>
      </Box>
      <Box p={10}>
      <Text>المتحصل {userData.name}</Text>
      <Text>الولاية {userData.state}</Text>
      <Text>السوق {userData.soag}</Text>

      </Box>
      </Flex>
  );
}
