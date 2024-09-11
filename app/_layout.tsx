import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React,{ createContext, useEffect } from 'react';
import { StatusBar} from "react-native";

import 'react-native-reanimated';

import { Appbar, MD3LightTheme as DefaultTheme, PaperProvider, ThemeProvider } from 'react-native-paper';

import * as SecureStore from 'expo-secure-store';

import { LoginPage } from "@/screens/loginPage";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'tomato',
    // secondary: 'yellow',
  },
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const UserContext = createContext({token:'',name:'',state:'',soag:''})

export default function RootLayout() {

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
      .then(async (userdata_str:any)=>{
        if (userdata_str){
          const data = JSON.parse(userdata_str)      
          setUserData(data);
        }
      })
  },[userData]);


  useEffect(() => {
    getUserData();
  }, []);

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
        <StatusBar />
        <UserContext.Provider value={userData}>
          <PaperProvider  theme={theme}>
            <ThemeProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </PaperProvider>
        </UserContext.Provider>
      </>
    ):(
      <>
        <StatusBar />
        <PaperProvider theme={theme}>
          <LoginPage onSucess={()=>{setIsLoggedin(true)}} />
        </PaperProvider>
      </>
    ))
    
  );
}
