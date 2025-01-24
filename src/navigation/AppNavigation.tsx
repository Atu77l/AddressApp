import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashHomeScreen from '../screens/Home/SplashHomeScreen';
import LoginScreen from '../screens/Auth/Login';
import ManualAddressForm from '../screens/Address/ManualAddressForm';
import AddressAutocomplete from '../screens/Address/AddressAutocomplete';
import AddressManagement from '../screens/Address/AddressManagement';
import MapAddress from '../screens/Address/MapAddress';
import Index from '../screens/Address/Index';
import {TouchableOpacity,Text,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{headerShown: true}}>
        <Stack.Screen name="SplashHomeScreen" component={SplashHomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ManualAddressForm" component={ManualAddressForm} 
        options={({ navigation }) => ({
          headerTitle: 'Add Address',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
            <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#f8f8f8', // Header background color
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}/>
        <Stack.Screen name="AddressAutoComplete" component={AddressAutocomplete} />
        <Stack.Screen name="AddressManagement" component={AddressManagement}/>
        <Stack.Screen name="MapAddress" component={MapAddress}/>
        <Stack.Screen name="Index" component={Index} options={({ navigation }) => ({
          headerTitle: 'Add Address',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#f8f8f8', // Header background color
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
  backText: {
    fontSize: 16,
    color: 'blue',
  },
});