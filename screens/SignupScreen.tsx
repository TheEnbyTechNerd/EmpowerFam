import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import AnimatedBubbles from '../components/AnimatedBubbles'; 
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import '../firebase'; 
import { Alert } from 'react-native';



  
export default function SignupScreen() {


  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

  
await setDoc(doc(db, 'users', user.uid), {
  parentName: username,
  email: contact,
  createdAt: new Date(),
});


      Alert.alert('Success', 'User registered successfully!');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };



  const navigation = useNavigation();


  const handleContinue = () => {
    if (username && password && contact) {
      navigation.navigate('ChildInfo');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.bubblesContainer}>
        <AnimatedBubbles />
      </View>


      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image source={require('../assets/images/icon.png')} style={styles.logo} />

          <Text style={styles.title}>Create Your Account</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#666"
            />

            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              value={contact}
              onChangeText={setContact}
              keyboardType="email-address"
              placeholderTextColor="#666"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#666"
            />

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bubblesContainer: {
    ...StyleSheet.absoluteFillObject,
    // zIndex: -1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-SemiBold',
    textAlign: 'center',
    color: '#243010',
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#243010',
    fontFamily: 'PlayfairDisplay-Regular',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  button: {
    backgroundColor: '#CA5310',
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
