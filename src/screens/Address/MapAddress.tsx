import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const MapAddress = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [address, setAddress] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.warn('Location permission denied');
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchAddress = async (lat:any, lon:any) => {
    const API_KEY = 'AIzaSyAasxoqliptkWaRVgUnQ08nBi0OiPktvEw';
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const onRegionChangeComplete = (newRegion:any) => {
    setRegion(newRegion);
    fetchAddress(newRegion.latitude, newRegion.longitude);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <Marker coordinate={region} />
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.addressText}>{address || 'Fetching address...'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MapAddress;
