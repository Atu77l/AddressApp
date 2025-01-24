import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [currentAddress, setCurrentAddress] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    type: 'Home',
    details: '',
    isDefault: false,
  });

  const addOrUpdateAddress = () => {
    if (!form.details.trim()) {
      Alert.alert('Validation Error', 'Address details are required.');
      return;
    }

    if (isEditing) {
      setAddresses((prev:any) =>
        prev.map((addr:any) => (addr.id === currentAddress.id ? { ...form, id: addr.id } : addr))
      );
    } else {
      setAddresses((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    resetForm();
  };

  const editAddress = (address:any) => {
    setForm(address);
    setCurrentAddress(address);
    setIsEditing(true);
  };

  const deleteAddress = (id:any) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const setDefaultAddress = (id:any) => {
    setAddresses((prev:any) =>
      prev.map((addr:any) => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const resetForm = () => {
    setForm({ type: 'Home', details: '', isDefault: false });
    setIsEditing(false);
    setCurrentAddress(null);
  };

  const renderAddressItem = ({ item }:any) => (
    <View style={styles.addressItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.addressType}>{item.type}</Text>
        <Text>{item.details}</Text>
        {item.isDefault && <Text style={styles.defaultLabel}>Default</Text>}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => editAddress(item)}>
          {/* <Icon name="edit" size={20} color="#4CAF50" /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteAddress(item.id)}>
          {/* <Icon name="delete" size={20} color="#F44336" /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDefaultAddress(item.id)}>
          {/* <Icon name="check-circle" size={20} color="#2196F3" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item:any) => item.id.toString()}
        renderItem={renderAddressItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No addresses added yet.</Text>}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Address Details"
          value={form.details}
          onChangeText={(value) => setForm({ ...form, details: value })}
        />
        <View style={styles.radioGroup}>
          <RadioButton.Group
            onValueChange={(value) => setForm({ ...form, type: value })}
            value={form.type}
          >
            <View style={styles.radioOption}>
              <RadioButton value="Home" />
              <Text>Home</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="Office" />
              <Text>Office</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="Other" />
              <Text>Other</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Button
          mode="contained"
          onPress={addOrUpdateAddress}
          style={styles.submitButton}
        >
          {isEditing ? 'Update Address' : 'Add Address'}
        </Button>
        {isEditing && (
          <Button onPress={resetForm} style={styles.cancelButton}>
            Cancel
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  addressItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  addressType: { fontWeight: 'bold', marginBottom: 4 },
  defaultLabel: { color: '#4CAF50', fontSize: 12, fontWeight: 'bold' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  form: { marginTop: 16, padding: 16, borderTopWidth: 1, borderColor: '#ddd' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, marginBottom: 8, borderRadius: 4 },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  radioOption: { flexDirection: 'row', alignItems: 'center' },
  submitButton: { backgroundColor: '#2196F3', marginBottom: 8 },
  cancelButton: { backgroundColor: '#F44336' },
  emptyText: { textAlign: 'center', marginTop: 16, color: '#777' },
});

export default AddressManagement;
