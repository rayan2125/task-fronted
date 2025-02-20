import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './routers/rootNavigation'; // Adjust path if needed

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
