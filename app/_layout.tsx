import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React,{ useEffect } from 'react';
import { StatusBar} from "react-native";

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Flex,Box } from "@react-native-material/core";

import { LoginPage } from "@/components/LoginPage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
      // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    // </ThemeProvider>
    ):(
      <Flex fill>
        <StatusBar barStyle="light-content" />
        <Box h={20}></Box>

        <LoginPage onSucess={()=>{setIsLoggedin(true)}
} />
      </Flex>
    ))
  );
}
