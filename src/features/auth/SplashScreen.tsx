import {View, StyleSheet, Image, Alert} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Logo from '@assets/images/logo.png';
import {navigate} from '@utils/NavigationUtils';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import { getUserById } from '@service/authServices';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken');
    const userId = tokenStorage.getString('userId');
  
    if (accessToken && userId) {
      try {
        const response = await getUserById();
        if (response) {
          setUser(response);
          navigate('HomeScreen');
          return;
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    navigate('GettingStarted');
  };
  

  useEffect(() => {
    const initialStart = async () => {
      try {
        // GeoLocation.requestAuthorization();
        tokenCheck();
      } catch (error) {
        Alert.alert(
          'Sorry We need location service to give you better App Experience',
        );
      }
    };

    const timeoutId = setTimeout(initialStart, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
