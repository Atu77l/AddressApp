import {
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userData} from '../../dummydata/userData';

export default function LoginScreen({navigation, route}: any) {
  const [contact, setContact] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [invalidUser, setInvalidUser] = useState(false);

  const callHandleSubmitWithoutServer = async () => {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].number == contact && userData[i].password == password) {
        await AsyncStorage.setItem('email', userData[i].email);
        await AsyncStorage.setItem('name', userData[i].name);
        navigation.navigate('Dashboard');
        return;
      }
    }
  };
  const callHandleSubmit = () => {
    const data = {contact, password};
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://10.0.2.2:4000/login',
      headers: {'Content-Type': 'application/json'},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response.data.status === 401) console.log('message');
        else {
          AsyncStorage.setItem('password', response?.data?.data?.password);
          AsyncStorage.setItem('contact', response?.data?.data?.contact);
          AsyncStorage.setItem('name', response?.data?.data?.name);
          AsyncStorage.setItem('email', response?.data?.data?.email);
          AsyncStorage.setItem('uuid', response?.data?.data?.uuid);
          AsyncStorage.setItem('userId', response?.data?.data?._id);

          navigation.navigate('Dashboard');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.logoContainer}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./../../assets/images/kullu.png')}
            style={{width: 200, height: 180}}
          />
        </View>
      </SafeAreaView>

      <View style={styles.formContainer}>
        <View>
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
              fontFamily: 'serif',
              fontWeight: '800',
              marginTop: 50,
              fontSize: 20,
              marginBottom: 50,
            }}>
            Login In RSVP Tech
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Number*"
            value={contact}
            editable={true}
            onChangeText={text => setContact(text)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password*"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('Forget')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              callHandleSubmitWithoutServer();
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {invalidUser && <Text>Sorry, Invalid credentials. Try again!</Text>}
        </View>
        <Text style={styles.bottomText}>or continue with</Text>
        <View style={styles.a}></View>
        <View style={styles.d}>
          <Text style={styles.e}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.f}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 230,
  },
  logo: {
    width: 280,
    height: 80,
  },
  formContainer: {
    flex: 1,

    paddingHorizontal: 32,
    paddingTop: 16,
    borderRadius: 50,
    marginHorizontal: 4,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headingText: {fontSize: 30, color: '#f2f8fd', fontWeight: 'bold'},
  form: {marginTop: 8, paddingTop: 16},
  label: {color: '#f2f8fd', marginLeft: 16, marginBottom: 2},
  input: {
    padding: 10,
    color: 'black',
    backgroundColor: 'lightgray',
    borderRadius: 12,
    marginBottom: 12,
  },
  forgotButton: {display: 'flex', alignItems: 'flex-end'},
  forgotText: {marginBottom: 20, color: 'black'},
  buttonContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 12,
    backgroundColor: 'darkblue',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#f2f8fd',
    paddingTop: 20,
    paddingBottom: 20,
  },
  a: {flexDirection: 'row', justifyContent: 'center'},
  b: {padding: 8, borderRadius: 16, backgroundColor: 'white'},
  c: {width: 40, height: 40},
  d: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    paddingBottom: 12,
  },
  e: {color: 'black', fontWeight: 'normal'},
  f: {fontWeight: 'bold', color: 'red'},
});
