import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AnimatedBubbles from '../components/AnimatedBubbles';  
import { RootStackParamList } from './types';

export default function SignInScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!contact.trim() || !password.trim()) {
      alert('Please enter your email or phone number and password.');
      return;
    }

    // TODO: Replace this with real authentication logic
    alert('Signing in...');

    navigation.navigate('Chatbot');
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
    
          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back to Welcome screen"
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Sign In to Your Account</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              value={contact}
              onChangeText={setContact}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#666"
              accessibilityLabel="Email or Phone Number"
              accessibilityHint="Enter your email or phone number"
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#666"
              accessibilityLabel="Password"
              accessibilityHint="Enter your password"
              returnKeyType="done"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSignIn}
              accessibilityRole="button"
              accessibilityLabel="Sign In"
              accessibilityHint="Tap to sign in to your account"
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// styles stay the same as you had


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
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#CA5310',
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay-SemiBold',
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
