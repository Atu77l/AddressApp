import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Index = ({ navigation }:any) => {
  const handlePress = () => {
    console.log('Button Pressed');
    // navigation.navigate('ManualAddressForm')
    navigation.navigate('AddressAutoComplete');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Text style={styles.text}>Welcome to React Native!</Text> */}
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>ADD ADDRESS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding:10
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    width:"100%",
    alignSelf: 'center',
    backgroundColor: '#EB5A3C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 5,
    margin:12,
    textAlign:'center',
    justifyContent:'center',
    marginLeft:10,
    marginRight:10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems:'center',
    textAlign:'center'
  },
});

export default Index;
