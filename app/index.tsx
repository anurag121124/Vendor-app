// app/home.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import LoginScreen from './(auth)/login';
import Homepage from './home';
export default function HomeScreen() {

  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      <Homepage />
      {/* You can also add other components or navigation buttons */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
