import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ManualAddressForm = ({navigation}:any) => {
  const [form, setForm] = useState({ flat: '', building: '', addressLine1: '',pincode: '',city: '',state: '',});

  // const handleLocationPermission = async () => {
  //   try {
  //     const permission =
  //       Platform.OS === 'android'
  //         ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  //         : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  //     const result = await request(permission);

  //     if (result === RESULTS.GRANTED) {
  //       // If location is granted, navigate to Manual Address
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log('User location:', position);
  //           navigation.navigate('ManualAddress');
  //         },
  //         error => {
  //           console.error('Error fetching location:', error);
  //         },
  //       );
  //     } else {
  //       // If location is denied, navigate to Google Search
  //       Alert.alert(
  //         'Permission Denied',
  //         'Location permission is required for this feature.',
  //         [{ text: 'OK', onPress: () => navigation.navigate('GoogleSearch') }],
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Permission request error:', error);
  //   }
  // };

  const handlePincodeChange = async (pincode: any) => {
    setForm({ ...form, pincode });

    if (pincode.length === 6) {
      // Call an API to get city and state from pincode
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      if (data[0]?.Status === 'Success') {
        setForm({
          ...form,
          city: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].State,
        });
      }
    }
  };

  const [isDefault, setIsDefault] = useState(false);

  const handleSaveAddress = () => {
    console.log('Address saved:', isDefault ? 'Set as Default' : 'Not Default');
  };

  // useEffect(()=>{
  //   handleLocationPermission();
  // },[])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Pincode"
            value={form.pincode}
            onChangeText={handlePincodeChange}
            keyboardType="number-pad"
          />
          <TextInput style={styles.input} placeholder="City" value={form.city} editable={false} />
          <TextInput style={styles.input} placeholder="State" value={form.state} editable={false} />

          <TextInput
            style={styles.input}
            placeholder="Flat/House Number"
            value={form.flat}
            onChangeText={(value) => setForm({ ...form, flat: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Building Name"
            value={form.building}
            onChangeText={(value) => setForm({ ...form, building: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            value={form.addressLine1}
            onChangeText={(value) => setForm({ ...form, addressLine1: value })}
          />
          
        </View>
      </ScrollView>
      <View style={styles.container}>
      {/* Checkbox Section */}
      <View style={styles.checkboxContainer}>
        <Checkbox.Android 
          color="#2BC2F7" 
          status={'checked'} 
          style={styles.checkbox} 
        />
        <Text style={styles.checkboxLabel}>Set as Default</Text>
      </View>

      {/* Save Address Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: { 
    height: 50,
    borderColor: '#ccc',
    borderRadius:16, 
    borderWidth: 1, 
    marginBottom: 10, 
    padding: 10 
  },
  container: {
    borderRadius: 10,
    backgroundColor: '#fff', // White background
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 5, // Shadow blur radius for iOS
    elevation: 5, // Shadow for Android
    padding: 20, // Padding inside the container
    margin: 10, // Space around the container
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Space below the checkbox
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333', // Dark text color
  },
  saveButton: {
    backgroundColor: '#EB5A3C', // Button background color
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManualAddressForm;
