import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_API_KEY = 'AIzaSyAasxoqliptkWaRVgUnQ08nBi0OiPktvEw';

const AddressAutocomplete = ({ setAddress }:any) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search Address"
        onPress={(data:any, details:any = null) => {
          const address = details?.formatted_address || data.description;
          setAddress(address);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          components: 'country:in', // Limit to India (or your preferred country)
        }}
        fetchDetails={true}
        styles={{
          textInputContainer: styles.inputContainer,
          textInput: styles.input,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: { width: '100%' },
  input: { height: 50, fontSize: 16 },
});

export default AddressAutocomplete;
