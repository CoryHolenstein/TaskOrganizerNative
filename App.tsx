import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import { NavigationStack } from './src/navigation/NavigationStack';
import './src/config/awsConfig';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppProvider>
        <NavigationStack />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
