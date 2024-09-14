import React from 'react';
import { router } from 'expo-router';
import { Appbar } from 'react-native-paper';

export function Header(props:{showBack:boolean, showProfile:boolean}) {
    const userLink = React.useCallback(() => {
        router.navigate("/profile");
    }, []);
    const backLink = React.useCallback(() => {
        router.back();
    }, []);

    return (
        <Appbar.Header elevated={true}>
            {(props.showBack)?(<Appbar.BackAction onPress={backLink} />):(<></>)}  
            <Appbar.Content title="تحصيل التعدين التقليدي" titleStyle={{textAlign: 'center'}} />
            {(props.showProfile)?(<Appbar.Action icon="account-circle" onPress={userLink} />):(<></>)}
        </Appbar.Header>
    );
}