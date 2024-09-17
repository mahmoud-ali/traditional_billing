import React from 'react';
import { router } from 'expo-router';
import { Appbar } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { getTheme } from '@/constants/Colors';

export function Header(props:{showBack:boolean, showProfile:boolean}) {
    const userLink = React.useCallback(() => {
        router.navigate("/profile");
    }, []);
    const backLink = React.useCallback(() => {
        router.back();
    }, []);

    const theme = getTheme()

    return (
        <>
            <StatusBar />
            <Appbar.Header theme={{colors: {primary: theme.colors.surface}}} elevated>
                {(props.showBack)?(<Appbar.BackAction onPress={backLink} />):(<></>)}  
                <Appbar.Content title="تحصيل التعدين التقليدي" titleStyle={{textAlign: 'center'}} />
                {(props.showProfile)?(<Appbar.Action icon="account-circle" onPress={userLink} />):(<></>)}
            </Appbar.Header>
        </>
    );
}