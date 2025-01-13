import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './(auth)/login'; // Import the LoginScreen component

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LoginScreen />
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
