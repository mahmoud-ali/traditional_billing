import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React,{ createContext, useEffect } from 'react';
import { StatusBar } from "react-native";

import 'react-native-reanimated';

import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from "@react-navigation/native";
import { getTheme } from '@/constants/Colors';

import * as SecureStore from 'expo-secure-store';

import { LoginPage } from "@/screens/loginPage";
import { Header } from '@/components/header';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const UserContext = createContext({token:'',name:'',state:'',soag:''})

export default function RootLayout() {

  const paperTheme = getTheme();
    
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoggedin, setIsLoggedin] = React.useState(false);

  const [userData, setUserData] = React.useState({token:'',name:'',state:'',soag:''});

  const getUserData = React.useCallback(()=>{
    console.log('getUserData')
    if(userData.token.length!=0) return;

    console.log('token',userData.token)
    SecureStore
      .getItemAsync('userdata',{})
      .then((userdata_str:any)=>{
        if (userdata_str){
          const data = JSON.parse(userdata_str)      
          // console.log(data)
          setUserData(data);
        }
      })
  },[]);

  useEffect(() => {
    if(isLoggedin){
      getUserData();
    }
  }, [isLoggedin]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    (isLoggedin?(
      <>
        <UserContext.Provider value={userData}>

            <PaperProvider theme={paperTheme}>
            <ThemeProvider value={paperTheme}>

                  <Stack screenOptions={{header: (props) =>  <Header showBack={false} showProfile={true} />}}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                  </ThemeProvider>
                  </PaperProvider>

        </UserContext.Provider>
      </>
    ):(
      <>
        <StatusBar />
        <PaperProvider theme={paperTheme}>
          <LoginPage onSucess={()=>{setIsLoggedin(true)}} />
        </PaperProvider>
      </>
    ))
    
  );
}
