import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';

import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

import merge from "deepmerge";
import { useColorScheme} from "react-native";
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const Colors = {
  light: {
    "colors": {
      "primary": "rgb(121, 89, 0)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(255, 223, 160)",
      "onPrimaryContainer": "rgb(38, 26, 0)",
      "secondary": "rgb(186, 26, 32)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(255, 218, 214)",
      "onSecondaryContainer": "rgb(65, 0, 3)",
      "tertiary": "rgb(0, 95, 175)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(212, 227, 255)",
      "onTertiaryContainer": "rgb(0, 28, 58)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(30, 27, 22)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(30, 27, 22)",
      "surfaceVariant": "rgb(237, 225, 207)",
      "onSurfaceVariant": "rgb(77, 70, 57)",
      "outline": "rgb(127, 118, 103)",
      "outlineVariant": "rgb(208, 197, 180)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(52, 48, 42)",
      "inverseOnSurface": "rgb(248, 239, 231)",
      "inversePrimary": "rgb(248, 189, 42)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(248, 243, 242)",
        "level2": "rgb(244, 238, 235)",
        "level3": "rgb(240, 233, 227)",
        "level4": "rgb(239, 232, 224)",
        "level5": "rgb(236, 228, 219)"
      },
      "surfaceDisabled": "rgba(30, 27, 22, 0.12)",
      "onSurfaceDisabled": "rgba(30, 27, 22, 0.38)",
      "backdrop": "rgba(54, 48, 36, 0.4)"
    }
  },
  dark: {
    "colors": {
      "primary": "rgb(248, 189, 42)",
      "onPrimary": "rgb(64, 45, 0)",
      "primaryContainer": "rgb(92, 67, 0)",
      "onPrimaryContainer": "rgb(255, 223, 160)",
      "secondary": "rgb(255, 179, 172)",
      "onSecondary": "rgb(104, 0, 8)",
      "secondaryContainer": "rgb(147, 0, 16)",
      "onSecondaryContainer": "rgb(255, 218, 214)",
      "tertiary": "rgb(165, 200, 255)",
      "onTertiary": "rgb(0, 49, 95)",
      "tertiaryContainer": "rgb(0, 71, 134)",
      "onTertiaryContainer": "rgb(212, 227, 255)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(30, 27, 22)",
      "onBackground": "rgb(233, 225, 216)",
      "surface": "rgb(30, 27, 22)",
      "onSurface": "rgb(233, 225, 216)",
      "surfaceVariant": "rgb(77, 70, 57)",
      "onSurfaceVariant": "rgb(208, 197, 180)",
      "outline": "rgb(153, 143, 128)",
      "outlineVariant": "rgb(77, 70, 57)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(233, 225, 216)",
      "inverseOnSurface": "rgb(52, 48, 42)",
      "inversePrimary": "rgb(121, 89, 0)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(41, 35, 23)",
        "level2": "rgb(47, 40, 24)",
        "level3": "rgb(54, 45, 24)",
        "level4": "rgb(56, 46, 24)",
        "level5": "rgb(61, 50, 25)"
      },
      "surfaceDisabled": "rgba(233, 225, 216, 0.12)",
      "onSurfaceDisabled": "rgba(233, 225, 216, 0.38)",
      "backdrop": "rgba(54, 48, 36, 0.4)"
    }
  },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

let CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
let CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

CombinedDefaultTheme = {
  ...CombinedDefaultTheme,
  colors:{
    ...CombinedDefaultTheme.colors,
    ...Colors.light.colors
  }
}

CombinedDarkTheme = {
  ...CombinedDarkTheme,
  colors:{
    ...CombinedDarkTheme.colors,
    ...Colors.dark.colors
  }
}

export const getTheme = function(){
  const colorScheme = useColorScheme();
  // // return CombinedLightTheme
  return (colorScheme === "dark") ? CombinedDarkTheme : CombinedDefaultTheme;
  // const colorScheme = useColorScheme();
  // const { theme } = useMaterial3Theme();

  // return (colorScheme === 'dark')
  //     ? { ...MD3DarkTheme, colors: theme.dark }
  //     : { ...MD3LightTheme, colors: theme.light };  
}
