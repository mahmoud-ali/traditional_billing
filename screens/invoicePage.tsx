import { Alert,StyleSheet, ToastAndroid,View } from "react-native";

import { useForm, Controller } from "react-hook-form";

import React, { useContext, useEffect } from "react";
import { Button,TextInput,Text, Appbar } from 'react-native-paper';
import {UserContext} from "@/app/_layout"

export default function InvoicePage() {
  interface InvoiceType {
    name:string,
    quantity_in_shoal:string,
    amount:string
  }

  const userData = useContext(UserContext);

  const [isPosting, setIsPosting] = React.useState(false);

  const invoice_request = React.useCallback((data:InvoiceType)=>{
    if(userData.token.length==0){
      console.log('no token2')
      return;
    }

    setIsPosting(true);
    ToastAndroid.showWithGravity('Connecting..', ToastAndroid.SHORT,ToastAndroid.BOTTOM);
    console.log('requesting...')
    fetch('https://mineralsgate.com/app/api-traditional/invoice/',{
      method: 'POST',
      body: JSON.stringify(data),          
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'token '+userData.token
      },          
    }).then(response => {
        setIsPosting(false)
        console.log(response.status)
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
        }else{
          Alert.alert('فشلت العملية', 'الرجاء المحاولة مرة اخرى.')
        }

        // return data;
      }).catch(error => {
        setIsPosting(false)
        ToastAndroid.showWithGravity(error.message , ToastAndroid.LONG,ToastAndroid.BOTTOM);//'Unable to connect, please try again later.'+
      });        
  
  }, [isPosting]);

  const onSubmit = React.useCallback((data:InvoiceType)=>{
    invoice_request(data)
  }, [isPosting])

  const onError = (errors:any, e:any) => console.log('Error',errors);  

  const { control, handleSubmit, reset, setFocus, formState: { errors,isValid } } = useForm({
    defaultValues: {
      name: '',
      quantity_in_shoal: '',
      amount: ''
    }
  });

  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title="تحصيل التعدين التقليدي" titleStyle={{textAlign: 'center'}} />
        <Appbar.Action icon="account-circle" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.container}>
          {/* <Text variant="displaySmall">تحصيل التعدين التقليدي</Text> */}
          <Text variant="headlineSmall" style={{marginTop: 10}}>ادخل البيانات الاتية:</Text>
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
            ((isValid && userData.token && !isPosting)?(
              <Button mode="contained" onPress={handleSubmit(onSubmit,onError)} style={styles.input}>ارسال</Button>
            ):(
              <Button mode="contained" disabled={true} style={styles.input}>{(isPosting)?("جاري الاتصال"):("اكمل البيانات")}</Button>
            ))
          }
        </View>
      </>    

  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // justifyContent: "center", 
    // marginHorizontal: 10,
    paddingHorizontal:10,
    backgroundColor: '#FFF'
  },
  input: { 
    marginVertical: 5 
  },
})
