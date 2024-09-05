import {  Link,Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Flex,Text,Box } from "@react-native-material/core";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'عفواً!' }} />
      <Flex fill>
        <Box h={100} mt={20} p={10}>
          <Text variant="h4">الشاشة غير موجودة!</Text>
        </Box>
        <Box p={10}>
          <Link href="/" style={styles.link}>
            <Text >Go to home screen!</Text>
          </Link>
        </Box>
      </Flex>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
