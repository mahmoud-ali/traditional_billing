import {  Link,Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { PaperProvider,Text } from 'react-native-paper';


export default function NotFoundScreen() {
  return (
    <PaperProvider>
      <Stack.Screen options={{ title: 'عفواً!' }} />
      <Text variant="titleLarge">الشاشة غير موجودة!</Text>
      <Link href="/" style={styles.link}>
        <Text >Go to home screen!</Text>
      </Link>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
