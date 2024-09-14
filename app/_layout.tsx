import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React,{ createContext, useEffect } from 'react';
import { StatusBar, useColorScheme} from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme"
import { Colors } from '@/constants/Colors';

import 'react-native-reanimated';

import { Appbar, MD3DarkTheme, MD3LightTheme, PaperProvider, ThemeProvider, useTheme } from 'react-native-paper';

import * as SecureStore from 'expo-secure-store';

import { LoginPage } from "@/screens/loginPage";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const UserContext = createContext({token:'',name:'',state:'',soag:''})

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = { ...MD3LightTheme, ...Colors.light.colors, colors: theme.light }
    // colorScheme === 'dark'
    //   ? { ...MD3DarkTheme, ...Colors.dark.colors, colors: theme.dark }
    //   : { ...MD3LightTheme, ...Colors.light.colors, colors: theme.light };
    
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
          console.log(data)
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
            {/* <ThemeProvider theme={paperTheme}> */}
            <StatusBar />

              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            {/* </ThemeProvider> */}
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
