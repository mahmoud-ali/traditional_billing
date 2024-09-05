import { View, Alert,StyleSheet, ToastAndroid } from "react-native";

import { useForm, Controller } from "react-hook-form";

import React from "react";
import { Flex,Button,TextInput,Text,Spacer,Box } from "@react-native-material/core";
import * as SecureStore from 'expo-secure-store';

export default function Payment() {
  const [token, setToken] = React.useState('');
  const [isPosting, setIsPosting] = React.useState(false);

  function invoice_request(data:object){
    setIsPosting(true)
    ToastAndroid.showWithGravity('Connecting..', ToastAndroid.SHORT,ToastAndroid.BOTTOM);
    fetch('https://mineralsgate.com/app/api-traditional/invoice/',{
      method: 'POST',
      body: JSON.stringify(data),          
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'token '+token
      },          
    }).then(response => {
        setIsPosting(false)

        if(response.status==200){
          response.json().then((data=>{
            if(data.status==0){
              Alert.alert('تمت العملية بنجاح', 'رقم الفاتورة: '+ data.invoiceId)
            }else{
              Alert.alert('فشلت العملية', data.statusDescription)
            }
          })).catch(error => {
            ToastAndroid.showWithGravity(error.message , ToastAndroid.LONG,ToastAndroid.BOTTOM);//'Unable to connect, please try again later.'+
          });
        }

        return data;
      }).catch(error => {
        setIsPosting(false)
        ToastAndroid.showWithGravity(error.message , ToastAndroid.LONG,ToastAndroid.BOTTOM);//'Unable to connect, please try again later.'+
      });        
  
  }

  const { control, handleSubmit, formState: { errors,isValid } } = useForm({
    defaultValues: {
      name: '',
      quantity_in_shoal: '',
      amount: ''
    }
  });

  const onSubmit = function(data:any){
    invoice_request(data)
  } 

  const onError = (errors:any, e:any) => console.log('Error',errors);  

  SecureStore.getItemAsync('userdata',{})
  .then(function(userdata_str:any){
    const userdata = JSON.parse(userdata_str)
    if(userdata.token){
      setToken(userdata.token)
    }
  }).catch((reason:any)=>{});

  return (
    <Flex fill>
      <Box h={100} mt={20} p={10}>
      <Text variant="h4">تحصيل التعدين التقليدي</Text>
      <Text>ادخل البيانات الاتية:</Text>
      </Box>
      <Box p={10}>
        <Controller
          control={control}
          rules={{
          required: true,
          maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="اسم المعدن"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}

            />
          )}
          name="name"
        />
        {errors.name && <Text>الحقل مطلوب.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /[0-9]/
        }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="عدد الشوالات"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="quantity_in_shoal"
        />
        {errors.quantity_in_shoal && <Text>الحقل مطلوب (رقمي).</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /[0-9]/
        }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="مبلغ التحصيل بالجنيه"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="amount"
        />
        {errors.amount && <Text>الحقل مطلوب (رقمي).</Text>}

        {
          ((isValid && token && !isPosting)?(
            <Button title="ارسال" onPress={handleSubmit(onSubmit,onError)} />
          ):(
            (isPosting)?(
              <Button title="جاري الاتصال"/>
            ):(
              <Button title="اكمل البيانات"/>
            )
          ))
        }
      </Box>
      </Flex>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
