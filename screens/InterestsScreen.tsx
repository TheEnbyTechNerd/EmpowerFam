import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AnimatedBubbles from '../components/AnimatedBubbles';
import { RootStackParamList } from './types';

const interestOptions = [
  'Sensory Friendly Events',
  'Community Forum',
  'Building Social Skills',
  'Visual Support',
  'Sensory Toys',
  'Routine Building',
  'Parental Support',
] as const;

export default function InterestsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest.');
      return;
    }
    navigation.navigate('Chatbot');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.background}>
        <AnimatedBubbles />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <Text
          style={styles.title}
          accessible={true}
          accessibilityRole="header"
        >
          How can we help?
        </Text>

        <View style={styles.therapiesContainer}>
          {interestOptions.map((interest) => {
            const selected = selectedInterests.includes(interest);
            return (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.therapyOption,
                  selected && styles.therapyOptionSelected,
                ]}
                onPress={() => toggleInterest(interest)}
                activeOpacity={0.7}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected }}
                accessibilityLabel={`${interest} option`}
                accessibilityHint={`Tap to ${
                  selected ? 'deselect' : 'select'
                } ${interest}`}
              >
                <Text
                  style={[
                    styles.therapyText,
                    selected && styles.therapyTextSelected,
                  ]}
                >
                  {selected ? '✔ ' : ''}
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          accessibilityRole="button"
          accessibilityLabel="Continue"
          accessibilityHint="Tap to complete the setup"
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    color: '#243010',
    fontFamily: 'PlayfairDisplay-SemiBold',
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 60,
  },
  therapiesContainer: {
    width: '100%',
    marginBottom: 16,
  },
  therapyOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CA5310',
  },
  therapyOptionSelected: {
    backgroundColor: '#CA5310',
  },
  therapyText: {
    color: '#CA5310',
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 16,
  },
  therapyTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#CA5310',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
});
