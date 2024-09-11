import React, { useContext, useEffect } from "react";

import { Appbar, Avatar, Card, IconButton, Text } from 'react-native-paper';
import {RefreshControl, ScrollView, StyleSheet, ToastAndroid, View } from "react-native";
import { InvoiceList } from "@/components/invoiceList";
import {UserContext} from "@/app/_layout"
// import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";

export default function HomePage() {
  const userData = useContext(UserContext);
  const [items,setItems] = React.useState([]);
  const [isLoadingInvoiceList,setIsLoadingInvoiceList] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  // function getData(token:string){
  // }

  const getData = React.useCallback(async (token:string) => {
    if(token.length==0) {
      console.log('no token.')
      return;
    }

    setIsLoadingInvoiceList(true)
    console.log('request..')
    try {
      const response = await fetch('https://mineralsgate.com/app/api-traditional/invoice/',{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'token '+token
        },          
      });
      const body = await response.json();
      console.log(response.status)
      if(response.status==200){
          console.log(body);
          setItems(body);
      }else{
          ToastAndroid.showWithGravity('فشبت عملية استرجاع البيانات، يمكن المحاولة في وقت لاحق.', ToastAndroid.LONG,ToastAndroid.BOTTOM);//'Unable to connect, please try again later.'+
      }
    } catch (error:any) {
      ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG,ToastAndroid.BOTTOM);//'Unable to connect, please try again later.'+
    } finally {
      setRefreshing(false);
      setIsLoadingInvoiceList(false)
    }
  },[userData, items, isLoadingInvoiceList, refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData(userData.token);    
  },[userData, items, isLoadingInvoiceList, refreshing]);

  useEffect(() => {
    getData(userData.token);
  }, []);
  
  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title="تحصيل التعدين التقليدي" titleStyle={{textAlign: 'center'}} />
        <Appbar.Action icon="account-circle" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView
      style={{flex:1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> 
        <View style={styles.container}>
          {/* <Card.Title
            title={userData.name}
            subtitle={userData.state+' / '+userData.soag} 
            left={(props) => <Avatar.Icon {...props} icon="account" />}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
          /> */}
          <InvoiceList title={'اخر '+items.length+' معاملات'} items={items} loading={items.length==0} />
          {/* <Text style={styles.row}><Text style={styles.label}>المتحصل: </Text><Text> {userData.name}</Text></Text>
          <Text style={styles.row}><Text style={styles.label}>الولاية: </Text><Text> {userData.state}</Text></Text>
          <Text style={styles.row}><Text style={styles.label}>السوق: </Text><Text> {userData.soag}</Text></Text>       */}
            {/* <BarChart data = {data} adjustToWidth={true} barWidth={22} noOfSections={3} barBorderRadius={4} frontColor={'#177AD5'}/> */}
            {/* <LineChart data = {data} /> */}
            {/* <PieChart data = {data} /> */}
          </View>    
        </ScrollView>
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
  label: {
    fontWeight:'bold',
  },
  row: {
    marginVertical: 5,
  }
})