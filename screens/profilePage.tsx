import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from 'expo-router';
import { Avatar, Button, Text } from 'react-native-paper';
import { Header } from "@/components/header";
import { UserContext } from "@/app/_layout";

import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from "@react-navigation/native";
import { getTheme } from '@/constants/Colors';


export default function ProfilePage(props:any) {
    const userData = useContext(UserContext);

    const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
    

    const LeftContent = (props:any) => <Avatar.Icon {...props} icon="account" />

    const paperTheme = getTheme();

    return (
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={paperTheme}>
          <Header showBack={true} showProfile={false} />
          <View style={styles.container}>
            <Text variant="titleLarge" style={styles.text}>{userData.name}</Text>
            <Text variant="bodyMedium" style={styles.text}>{userData.state}</Text>
            <Text variant="bodyMedium" style={styles.text}>{userData.soag}</Text>
          </View>
          </ThemeProvider>
        </PaperProvider>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1, 
        justifyContent: "flex-start", 
        paddingHorizontal:10,
        // backgroundColor: '#FFF',
      },
      row: {
        marginVertical: 5,

      },
      text: {
        // color: "#eee"
      }
    
    })