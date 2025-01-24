import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

// Libraries
import SplashScreen from 'react-native-splash-screen';

const SplashHomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    const initializeApp = async () => {
      setTimeout(() => {
        // SplashScreen.hide();
        navigation.navigate('Login');
      }, 2000); // Display for 2 seconds
    };

    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/logo/logo.jpg')} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.text}>Welcome to MyApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop:40
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
});

export default SplashHomeScreen;
