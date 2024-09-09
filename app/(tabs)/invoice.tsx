import { Alert,StyleSheet, ToastAndroid,View } from "react-native";

import { useForm, Controller } from "react-hook-form";

import React from "react";
import { Button,TextInput,Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export default function Invoice() {
  interface InvoiceType {
    name:string,
    quantity_in_shoal:string,
    amount:string
  }

  const [token, setToken] = React.useState('');
  const [isPosting, setIsPosting] = React.useState(false);

  SecureStore.getItemAsync('userdata',{})
  .then(function(userdata_str:any){
    const userdata = JSON.parse(userdata_str);
    if(userdata.token){
      setToken(userdata.token)
    }  
  }).catch((reason:any)=>{});

  const { control, handleSubmit, reset, setFocus, formState: { errors,isValid } } = useForm({
    defaultValues: {
      name: '',
      quantity_in_shoal: '',
      amount: ''
    }
  });

  const onSubmit = function(data:InvoiceType){
    invoice_request(data)
  } 

  const onError = (errors:any, e:any) => console.log('Error',errors);  

  function invoice_request(data:InvoiceType){
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
          response.json().then((body=>{
            if(body.status==0){
              reset();
              Alert.alert('تمت العملية بنجاح', `رقم امر الدفع: ${body.invoiceId}\n اسم المعدن: ${data.name}\n الكمية: ${data.quantity_in_shoal}\n المبلغ: ${data.amount}`)
              setFocus("name", { shouldSelect: true })
            }else{
              Alert.alert('فشلت العملية', body.statusDescription)
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

  return (
    <View style={styles.container}>
        <Text variant="displaySmall">تحصيل التعدين التقليدي</Text>
        <Text>ادخل البيانات الاتية:</Text>
        <Controller
          control={control}
          rules={{
          required: true,
          maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="اسم المعدن"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              mode="outlined"
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
              label="عدد الشوالات"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputMode='numeric'
              style={styles.input}
              mode="outlined"
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
              label="مبلغ التحصيل بالجنيه"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputMode='decimal'
              style={styles.input}
              mode="outlined"
            />
          )}
          name="amount"
        />
        {errors.amount && <Text>الحقل مطلوب (رقمي).</Text>}

        {
          ((isValid && token && !isPosting)?(
            <Button mode="contained" onPress={handleSubmit(onSubmit,onError)} style={styles.input}>ارسال</Button>
          ):(
            <Button mode="contained" disabled={true} style={styles.input}>{(isPosting)?("جاري الاتصال"):("اكمل البيانات")}</Button>
          ))
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // justifyContent: "center", 
    marginHorizontal: 10 
  },
  input: { 
    marginVertical: 5 
  },
})
