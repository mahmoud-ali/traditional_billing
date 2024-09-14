import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from 'expo-router';
import { Appbar, Avatar, Button, Card, Text } from 'react-native-paper';
import { Header } from "@/components/header";
import { UserContext } from "@/app/_layout";

export default function ProfilePage(props:any) {
  const userData = useContext(UserContext);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
    

const LeftContent = (props:any) => <Avatar.Icon {...props} icon="account" />

    return (
      <>
        <Header showBack={true} showProfile={false} />
        <View style={styles.container}>
          <Text style={styles.row} variant="titleLarge">{userData.name}</Text>
          <Text variant="bodyMedium">{userData.state}</Text>
          <Text variant="bodyMedium">{userData.soag}</Text>
        </View>
      </>
    );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1, 
        justifyContent: "flex-start", 
        paddingHorizontal:10,
        backgroundColor: '#FFF'
      },
      row: {
        marginVertical: 5,

      }
    
    })