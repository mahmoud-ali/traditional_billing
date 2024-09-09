import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React,{ useEffect } from 'react';
import { StatusBar} from "react-native";

import 'react-native-reanimated';

import { MD3LightTheme as DefaultTheme, PaperProvider, ThemeProvider } from 'react-native-paper';

import { LoginPage } from "@/components/LoginPage";


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

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoggedin, setIsLoggedin] = React.useState(false);


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
        <PaperProvider  theme={theme}>
          <ThemeProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </PaperProvider>
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
