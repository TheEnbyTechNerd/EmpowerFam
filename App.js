import React, { useCallback, useEffect, useState } from 'react';
import { View} from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useColorScheme } from 'react-native'



import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import ChildInfoScreen from './screens/ChildInfoScreen';
import SignInScreen from './screens/SigninScreen';
import ChatbotScreen from './screens/ChatbotScreen';

const Stack = createNativeStackNavigator();
// const colorScheme = useColorScheme();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        console.log('Loading fonts...');
        await Font.loadAsync({
          'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplayRegular.ttf'),
          'PlayfairDisplay-SemiBold': require('./assets/fonts/PlayfairDisplaySemiBold.ttf'),
        });
        console.log('Fonts loaded!');
      } catch (e) {
        console.error('Font loading failed:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    loadResources();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log('Hiding splash screen...');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; 
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signin"
            component={SignInScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen 
            name="Signup" 
            component={SignupScreen}
            options={{ 
              headerShown: false,
              animation: 'fade' }}
          />

          <Stack.Screen
            name="ChildInfo"
            component={ChildInfoScreen}
            options={{ 
              headerShown: false }}
          />


          <Stack.Screen
            name="Chatbot"
            component={ChatbotScreen}
            options={{ headerShown: false }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
