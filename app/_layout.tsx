



import 'react-native-reanimated';


import Rootnavigation from "../routers/rootNavigation"
import { StatusBar, Text, View } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Provider } from 'react-redux'
import store from "@/redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

export default function RootLayout() {

  let persistor = persistStore(store)



  return (
    <AlertNotificationRoot>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

    <NativeBaseProvider>

      <Rootnavigation />
    </NativeBaseProvider>
    </PersistGate>
    </Provider>
    </AlertNotificationRoot>
  );
}
