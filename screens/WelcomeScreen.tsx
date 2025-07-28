import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import AnimatedBubbles from '../components/AnimatedBubbles'; 
import AnimatedLogo from '../components/AnimatedLogo';

import { RootStackParamList } from './types';



type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <AnimatedLogo />

      <View style={styles.background}>
        <AnimatedBubbles />
      </View>

      <Text style={styles.title}>Welcome to EmpowerFam 👋</Text>

      <Text style={styles.subtitle}>
        Support and resources for families raising children with autism.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signin')}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    color: '#243010',
    fontFamily: 'PlayfairDisplay-SemiBold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#243010',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 16,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  button: {
    backgroundColor: '#CA5310',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '60%',
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: '#F7D08A', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
});
