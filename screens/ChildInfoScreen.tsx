import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AnimatedBubbles from '../components/AnimatedBubbles';

type RootStackParamList = {
  Interests: undefined;
};

const therapiesOptions = [
  'None',
  'ABA Therapy',
  'Speech Therapy',
  'Occupational Therapy',
  'Physical Therapy',
  'Social Skills Training',
] as const;

type TherapyOption = typeof therapiesOptions[number];

const genderOptions = [
  'Female',
  'Male',
  'Non-binary',
  'Prefer not to say',
];

export default function ChildInfoScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [childName, setChildName] = useState<string>('');
  const [age, setAge] = useState<string>('');

  // New gender selection state
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const [therapies, setTherapies] = useState<TherapyOption[]>([]);

  const toggleTherapy = (therapy: TherapyOption) => {
    if (therapy === 'None') {
      setTherapies(['None']);
    } else {
      const newTherapies = therapies.includes(therapy)
        ? therapies.filter((t) => t !== therapy)
        : [...therapies.filter((t) => t !== 'None'), therapy];
      setTherapies(newTherapies);
    }
  };

  const handleContinue = () => {
    if (!childName.trim() || !age.trim() || !selectedGender) {
      alert('Please complete all required fields.');
      return;
    }
    navigation.navigate('Interests');
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
          Tell Us About Your Child
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Child's Name"
          value={childName}
          onChangeText={setChildName}
          placeholderTextColor="#666"
          autoCapitalize="words"
          keyboardType="default"
          accessibilityLabel="Child's Name"
          accessibilityHint="Enter your child's first name"
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor="#666"
          maxLength={3}
          accessibilityLabel="Child's Age"
          accessibilityHint="Enter your child's age in years"
          returnKeyType="next"
        />

        {/* Gender selector as buttons */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.therapiesContainer}>
          {genderOptions.map((option) => {
            const selected = selectedGender === option;
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.therapyOption,
                  selected && styles.therapyOptionSelected,
                ]}
                onPress={() => setSelectedGender(option)}
                activeOpacity={0.7}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={`Gender option: ${option}`}
                accessibilityHint={`Tap to select ${option} gender`}
              >
                <Text
                  style={[
                    styles.therapyText,
                    selected && styles.therapyTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Therapies multi-select */}
        <Text style={styles.label}>Select Therapies</Text>
        <View style={styles.therapiesContainer}>
          {therapiesOptions.map((therapy) => {
            const selected = therapies.includes(therapy);
            return (
              <TouchableOpacity
                key={therapy}
                style={[
                  styles.therapyOption,
                  selected && styles.therapyOptionSelected,
                ]}
                onPress={() => toggleTherapy(therapy)}
                activeOpacity={0.7}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected }}
                accessibilityLabel={`${therapy} therapy option`}
                accessibilityHint={`Tap to ${
                  selected ? 'deselect' : 'select'
                } ${therapy}`}
              >
                <Text
                  style={[
                    styles.therapyText,
                    selected && styles.therapyTextSelected,
                  ]}
                >
                  {selected ? '✔ ' : ''}
                  {therapy}
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
          accessibilityHint="Tap to continue to the next screen"
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
  label: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay-SemiBold',
    color: '#243010',
    marginBottom: 8,
    marginTop: 24,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#243010',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignSelf: 'stretch',
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
