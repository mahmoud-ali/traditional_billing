import React from "react";
import { Alert,ToastAndroid } from "react-native";
import LoginScreen from "react-native-login-screen";
import * as SecureStore from 'expo-secure-store';

export function LoginPage({onSucess}:any) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPosting, setIsPosting] = React.useState(false);
  
  const login_request = React.useCallback(()=>{
    if(isPosting || !username || !password) return;

    setIsPosting(true);
    ToastAndroid.showWithGravity('Connecting..', ToastAndroid.SHORT,ToastAndroid.BOTTOM);
    fetch('https://mineralsgate.com/app/api-traditional/login/',{
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),          
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },          
    }).then(response => response.json())
      .then(json => {
        setIsPosting(false);
        if (json.token){
          SecureStore.setItem('userdata', JSON.stringify(json));
          onSucess();
        }else{
          Alert.alert('خطأ في تسجيل الدخول', 'البريد الالكتروني او كلمة المرور غير صحيحة.')
        }
        return json;
      })
      .catch(error => {
        setIsPosting(false);
        ToastAndroid.showWithGravity(error.message , ToastAndroid.LONG,ToastAndroid.BOTTOM);//'Unable to connect, please try again later.'+
        // console.error("error",error);
      });        
  
  }, [username,password]);
  
  
  return (
      <LoginScreen
        logoImageSource={require('../assets/images/smrc-icon.png')}
        onLoginPress={login_request}
        onSignupPress={() => {}}
        onEmailChange={setUsername}
        emailPlaceholder="البريد الالكتروني"
        onPasswordChange={setPassword}
        passwordPlaceholder="كلمة المرور"
        loginButtonText="تسجيل الدخول"
        disableSignup
        disableSocialButtons
        disableDivider
        passwordTextInputProps={{
          enableIcon: false
        }}
      />    
  );
}
