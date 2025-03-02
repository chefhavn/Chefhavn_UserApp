import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import CustomerLogin from '@features/auth/CustomerLogin';
import GettingStarted from '@features/auth/GettingStarted';
import OtpScreen from '@features/auth/OtpScreen';
import HomeScreen from '@features/home/HomeScreen';
import EventDetails from '@features/events/EventDetails';
import CheckoutScreen from '@features/events/CheckoutScreen';
import SuccessOrderScreen from '@features/events/SuccessOrderScreen';
import HelpScreen from '@features/profile/HelpScreen';
import MyOrderScreen from '@features/orders/MyOrderScreen';
import ViewOrderScreen from '@features/orders/ViewOrderScreen';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="GettingStarted"
          component={GettingStarted}
        />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="CustomerLogin"
          component={CustomerLogin}
        />
        <Stack.Screen
          options={{
            animation: 'fade_from_bottom',
          }}
          name="OtpScreen"
          component={OtpScreen}
        />
        <Stack.Screen
          options={{
            animation: 'fade_from_bottom',
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
          }}
          name="EventDetails"
          component={EventDetails}
        />
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
          }}
          name="CheckoutScreen"
          component={CheckoutScreen}
        />
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
          }}
          name="SuccessOrderScreen"
          component={SuccessOrderScreen}
        />
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
          }}
          name="MyOrderScreen"
          component={MyOrderScreen}
        />
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
          }}
          name="ViewOrderScreen"
          component={ViewOrderScreen}
        />
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
          }}
          name="HelpScreen"
          component={HelpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
